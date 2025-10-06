# Swedish Pastry Bakery API

## Schema

```typescript
const SwedishPastrySchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1).max(100),
    flavor: z.string().min(1).max(50),
    price: z.number().positive(),
    ingredients: z.array(z.string()).min(1),
});
```

**What it validates and why:**

- **`id`**: Must be a positive integer to ensure unique identification of each pastry
- **`name`**: String between 1-100 characters for the pastry name (e.g., "Kanelbulle")
- **`flavor`**: String between 1-50 characters describing the main flavor profile
- **`price`**: Must be a positive number representing the price in SEK (Swedish Kronor)
- **`ingredients`**: Array of strings with at least one ingredient, ensuring each pastry has proper ingredient listing for customers with allergies or dietary restrictions

This validation ensures:

- Data consistency across all API operations
- Type safety at runtime
- Proper error handling for invalid requests
- Clear feedback when data doesn't meet requirements

## API Endpoints

- `GET /pastries` - Get all pastries
- `GET /pastries/:id` - Get a specific pastry by ID
- `POST /pastries` - Add a new pastry
- `PUT /pastries/:id` - Update an existing pastry
- `DELETE /pastries/:id` - Delete a pastry

## How to Run the Code

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation and Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **The server will start on port 3000:**

   ```text
   Server running on port 3000
   ```

4. **Test the API:**
   You can now access the API at `http://localhost:3000/pastries`

### Example API Usage

**Get all pastries:**

```bash
GET http://localhost:3000/pastries
```

**Add a new pastry:**

```bash
POST http://localhost:3000/pastries
Content-Type: application/json

{
    "id": 4,
    "name": "Lussebulle",
    "flavor": "Saffron",
    "price": 28.00,
    "ingredients": ["flour", "butter", "sugar", "saffron", "raisins"]
}
```

### Development

The project uses:

- **TypeScript** for type safety
- **nodemon** for automatic server restart during development
- **Zod** for runtime schema validation
- **Express.js** for the web server framework

To make changes, edit the `server.ts` file and the server will automatically restart thanks to nodemon.
