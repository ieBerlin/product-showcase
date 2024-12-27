<!-- i need to create function so my backend can't shutdown when i request for update or post. -->

<!-- i need to test my api so i confirm that there's no error occurs! -->

We developed a robust updateWishlist route to manage user wishlists in a TypeScript-based Express backend. The function ensures data integrity and proper error handling for seamless user interactions. First, we validated the userId, productId, and quantity fields, checking their types and ensuring they meet required conditions. We confirmed that the user and product exist in the database before proceeding to any updates.

If the specified product already exists in the user's wishlist, we adjusted the quantity by summing the new value with the existing one. If the quantity provided is zero, the product is removed from the wishlist entirely. For new wishlist entries, the function appends the product with the specified quantity, provided it is greater than zero. All operations are executed safely with checks for potential errors and invalid data.

This implementation not only prevents duplicate entries but also dynamically adjusts or removes items based on the provided quantity. Responses to the client include relevant success or error messages to improve user experience. The final solution is both scalable and reliable, ensuring wishlist updates work seamlessly while preserving database integrity.