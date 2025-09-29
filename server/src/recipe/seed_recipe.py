import random
import string
from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "mealplanner"
COLLECTION_NAME = "recipes"

diets = ["omnivore", "vegetarian", "vegan", "keto"]
cuisines = ["indian", "italian", "japanese"]
allergens = ["gluten", "dairy", "egg", "soy", "fish", "nuts", "shellfish"]

ingredients_pool = [
    "chicken", "paneer", "tofu", "lentils", "rice", "potato", "tomato",
    "onion", "spinach", "butter", "cream", "garlic", "ginger", "yogurt",
    "cheese", "bread", "eggplant", "zucchini", "fish", "bacon", "mushroom",
    "broccoli", "bell pepper", "carrot", "beans", "pasta", "noodles", "soy sauce",
    "olive oil", "basil", "oregano"
]

def random_ingredients(n=3):
    """Pick n random ingredients with fake quantity + unit."""
    units = ["g", "ml", "pcs"]
    return [
        {
            "name": ing,
            "quantity": random.randint(50, 300),
            "unit": random.choice(units)
        }
        for ing in random.sample(ingredients_pool, n)
    ]

def generate_recipe(i):
    """Generate one recipe document."""
    title = f"Recipe {i} - {random.choice(['Delight', 'Special', 'Curry', 'Soup', 'Salad', 'Stir Fry', 'Pasta'])}"
    diet = random.choice(diets)
    cuisine = random.choice(cuisines)
    cost = round(random.uniform(3, 15), 2)

    # allergen tags: random subset
    allergen_tags = random.sample(allergens, random.randint(0, 2))

    return {
        "title": title,
        "ingredients": random_ingredients(random.randint(2, 5)),
        "costPerServing": cost,
        "dietTags": [diet],
        "allergenTags": allergen_tags,
        "cuisine": cuisine
    }

def main():
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    col = db[COLLECTION_NAME]

    # clear old recipes
    col.delete_many({})
    print("🗑️ Cleared old recipes")

    # insert 120 recipes
    recipes = [generate_recipe(i) for i in range(1, 121)]
    col.insert_many(recipes)

    print(f"✅ Inserted {len(recipes)} recipes into {DB_NAME}.{COLLECTION_NAME}")

if __name__ == "__main__":
    main()
