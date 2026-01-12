# Product Explorer Dashboard

## Project Overview

The Product Explorer Dashboard is a responsive web application built with Next.js, TypeScript, and Tailwind CSS. It allows users to browse products, view product details, search and filter products, and manage their favorite items.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd product-explorer-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:3000`.

## Features Implemented

- **Product Listing Page**: Displays a grid of products with their image, title, price, and category.
- **Search and Filtering**: Search products by title and filter by category.
- **Product Details Page**: View detailed information about a product, including a large image, description, and price.
- **Favorites Feature**: Mark/unmark products as favorites and persist them using `localStorage`.
- **Responsive Design**: Mobile-first design with clean layouts for tablet and desktop.
- **Loading, Error, and Empty States**: Provides clear feedback to users during data fetching.

## Design Decisions

- **Folder Structure**: Organized into `components`, `lib`, `types`, and `app` for scalability and maintainability.
- **API Integration**: Centralized API logic in `lib/api.ts` to separate concerns.
- **State Management**: Used `useState` and `useMemo` for predictable state handling.
- **Styling**: Leveraged Tailwind CSS for rapid and consistent styling.

## Assumptions & Trade-offs

- **API Reliability**: Assumes the API is stable and returns valid data.
- **Favorites Persistence**: Used `localStorage` for simplicity; not suitable for multi-device sync.
- **Error Handling**: Basic error messages for clarity; could be enhanced with detailed logs.

## Future Enhancements

- Add sorting by price.
- Implement a dark mode toggle.
- Optimize API calls with caching.

---

Thank you for reviewing the Product Explorer Dashboard!
