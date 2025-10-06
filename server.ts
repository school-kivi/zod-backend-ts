import express from 'express';
import { z } from 'zod';

const app = express();
const port = 3000;
app.use(express.json());

const SwedishPastrySchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1).max(100),
    flavor: z.string().min(1).max(50),
    price: z.number().positive(),
    ingredients: z.array(z.string()).min(1),
});

type SwedishPastry = z.infer<typeof SwedishPastrySchema>;
let pastries: SwedishPastry[] = [
    { id: 1, name: "Kanelbulle", flavor: "Cinnamon", price: 25.50, ingredients: ["flour", "butter", "sugar", "cinnamon", "cardamom"] },
    { id: 2, name: "Semla", flavor: "Almond & Cream", price: 35.00, ingredients: ["wheat bun", "almond paste", "whipped cream", "powdered sugar"] },
    { id: 3, name: "Prinsesstårta", flavor: "Vanilla & Raspberry", price: 450.00, ingredients: ["sponge cake", "vanilla custard", "raspberry jam", "whipped cream", "marzipan"] },
];

app.get('/pastries', (req, res) => {
    res.json(pastries);
});
app.post('/pastries', (req, res) => {
    const newPastry = SwedishPastrySchema.parse(req.body);
    pastries.push(newPastry);
    res.status(201).json({message: 'Swedish pastry added successfully!', pastry: newPastry});
});

app.put('/pastries/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pastry = pastries.find(p => p.id === id);
    if (pastry) {
        const updatedPastry = SwedishPastrySchema.parse(req.body);
        pastries = pastries.map(p => (p.id === id ? updatedPastry : p));
        res.json({message: 'Swedish pastry updated successfully!', pastry: updatedPastry});
    } else {
        res.status(404).json({message: 'Swedish pastry not found!'});
    }
});

app.delete('/pastries/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pastries = pastries.filter(p => p.id !== id);
    res.status(200).json({message: 'Swedish pastry deleted successfully!'});
});

app.get('/pastries/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pastry = pastries.find(p => p.id === id);
    if (pastry) {
        res.json(pastry);
    } else {
        res.status(404).send('Swedish pastry not found');
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});