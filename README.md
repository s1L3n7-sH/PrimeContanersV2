<<<<<<< HEAD
# Prime Containers

Prime Containers is an e-commerce platform built with Next.js 14, designed to sell, rent, and modify shipping containers. The platform provides a modern, responsive shopping experience with advanced features like cart management, product filtering, and a clean user interface.

## Table of Contents

- [Prime Containers](#prime-containers)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
=======
[![Shopco Screenshot](https://github.com/mohammadoftadeh/repo-assets/blob/main/shopco-cover.png?raw=true)](https://next-ecommerce-shopco.vercel.app/)

# Shopco

Shopco is an open-source project that converts a Figma design of an e-commerce website into a fully responsive front-end application. It utilizes **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Redux**, **Framer Motion**, and **ShadCN UI** to deliver a modern, scalable, and optimized solution based on industry standards.

## Table of Contents

- [Shopco](#shopco)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Demo](#demo)
>>>>>>> 0113b73fcb7e8e7c1f6c776a6fb3f9cc2cdc10fd
  - [Features](#features)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
<<<<<<< HEAD
  - [API Integration](#api-integration)
  - [State Management](#state-management)
  - [Deployment](#deployment)
  - [Contributing](#contributing)
=======
  - [Contributing](#contributing)
  - [Issues](#issues)
>>>>>>> 0113b73fcb7e8e7c1f6c776a6fb3f9cc2cdc10fd
  - [License](#license)
  - [Contact](#contact)

## Overview

<<<<<<< HEAD
Prime Containers bridges the gap between shipping container suppliers and customers by providing an intuitive e-commerce platform. The application features a modern UI with animations, responsive design, and comprehensive shopping functionality. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Redux, it follows industry best practices for performance, SEO, and accessibility.

## Features

- **Next.js 14 App Router**: Server-side rendering (SSR), Static Site Generation (SSG), optimized routing, and API integrations
- **TypeScript**: Strongly typed code for better error detection and maintainability
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Redux Toolkit**: State management for shopping cart and product selection
- **Framer Motion**: Smooth animations and transitions for an enhanced user experience
- **Responsive Design**: Mobile-first design ensuring the layout adapts across devices
- **Product Filtering**: Advanced filtering options by category, price, size, and color
- **Shopping Cart**: Persistent cart functionality with local storage
- **Product Details**: Detailed product views with image galleries and specifications
- **Reviews System**: Customer review and rating functionality
- **SEO Optimized**: Built with best practices for search engine optimization
- **Accessibility**: Following WCAG standards for inclusive design

## Technologies

- **Next.js 14** - A popular React framework with built-in SSR and optimization
- **TypeScript** - A superset of JavaScript for strong typing and code consistency
- **Tailwind CSS** - A utility-first CSS framework for fast, responsive design
- **Redux Toolkit** - State management for shopping cart and global app state
- **Framer Motion** - A library for animations and interactions in React
- **ShadCN UI** - Beautifully styled, accessible, and customizable UI components
- **React Icons** - SVG icons for React projects
- **Redux Persist** - Persist and rehydrate Redux store
- **Lucide React** - Beautifully simple, consistent icons

## Installation

To get started with Prime Containers locally, follow these steps:
=======
Shopco bridges the gap between design and development by converting Figma designs into production-ready code. The project follows best practices for **SEO**, **performance optimization**, and **accessibility**, making it a perfect foundation for developers looking to create scalable and maintainable e-commerce front-ends.

## Demo

Check out the live demo: [Shopco Demo](https://next-ecommerce-shopco.vercel.app/)

<!-- [![Shopco Screenshot](https://github.com/mohammadoftadeh/repo-assets/blob/main/shopco-cover.png?raw=true)](https://next-ecommerce-shopco.vercel.app/) -->

## Features

- **Next.js 14**: Server-side rendering (SSR), Static Site Generation (SSG), optimized routing, and API integrations.
- **TypeScript**: Strongly typed code for better error detection and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Redux**: State management for managing the shopping cart and other global states.
- **Framer Motion**: Smooth animations and transitions for an enhanced user experience.
- **ShadCN UI**: Beautifully styled, accessible, and customizable UI components.
- **Fully Responsive**: Mobile-first design ensuring the layout adapts across devices.
- **Performance Optimized**: Best practices followed for fast loading and interaction.
- **Accessible**: Built with accessibility standards to provide an inclusive experience.

## Technologies

- **Next.js 14** - A popular React framework with built-in SSR and optimization.
- **TypeScript** - A superset of JavaScript for strong typing and code consistency.
- **Tailwind CSS** - A utility-first CSS framework for fast, responsive design.
- **Redux** - A state management library used for the shopping cart and global app state.
- **Framer Motion** - A library for animations and interactions in React.
- **ShadCN UI** - A collection of beautiful, accessible, and customizable UI components.
- **Figma** - The design tool used as the source of the project’s layout. The [Figma file](https://www.figma.com/community/file/1273571982885059508/e-commerce-website-template-freebie) designed by [Hamza Naeem](https://www.figma.com/@hamzauix)

## Installation

To get started with Shopco locally, follow these steps:
>>>>>>> 0113b73fcb7e8e7c1f6c776a6fb3f9cc2cdc10fd

1. **Clone the repository:**

   ```bash
<<<<<<< HEAD
   git clone https://github.com/your-username/PrimeContainers.git
   cd PrimeContainers
=======
   git clone https://github.com/mohammadoftadeh/next-ecommerce-shopco.git
   cd next-ecommerce-shopco
>>>>>>> 0113b73fcb7e8e7c1f6c776a6fb3f9cc2cdc10fd
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   ```bash
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   ```bash
   yarn dev
   ```

4. **Open in your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

<<<<<<< HEAD
- To explore or modify the code, navigate through the `components`, `features`, and `app` directories
- The shopping cart logic is managed using **Redux Toolkit**. You can find the store configuration and cart actions in the `src/lib/features` directory
- **ShadCN UI** components are used across the app. They can be customized in the `src/components/ui` directory
- Product data is currently hardcoded in the `src/app/page.tsx` file but can be connected to an API
- The video background in the header uses a fallback mechanism for different browsers

### Key Pages

- **Home Page** (`/`): Main landing page with featured products and categories
- **Shop Page** (`/shop`): Product listing with filtering and sorting options
- **Product Page** (`/shop/product/[id]`): Detailed product view with options
- **Cart Page** (`/cart`): Shopping cart with order summary

## Project Structure

```
PrimeContainers/
│
├── public/                # Static assets (images, videos, etc.)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── cart/          # Shopping cart page
│   │   ├── shop/          # Product listing and detail pages
│   │   │   └── product/   # Individual product pages
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── providers.tsx  # Redux provider wrapper
│   ├── components/        # Reusable components
│   │   ├── cart-page/     # Cart-specific components
│   │   ├── common/        # Shared components (ProductCard, etc.)
│   │   ├── homepage/      # Home page sections
│   │   ├── layout/        # Layout components (Navbar, Footer)
│   │   ├── product-page/  # Product page sections
│   │   ├── shop-page/     # Shop page sections
│   │   └── ui/            # ShadCN UI components
│   ├── lib/
│   │   ├── features/      # Redux slices for features (cart, products)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store.ts       # Redux store configuration
│   │   └── utils.ts       # Utility functions
│   ├── styles/            # CSS styles and font configurations
│   ├── types/             # TypeScript type definitions
=======
- To explore or modify the code, navigate through the `components`, `features`, and `app` directories.
- The shopping cart logic is managed using **Redux**. You can find the store configuration and cart actions in the `src/lib/features` directory.
- **ShadCN UI** components are used across the app. They can be customized in the `src/components/ui` directory.
- You can easily modify and extend the project to suit your needs, whether for personal use or professional projects.

## Project Structure

```bash
Shopco/
│
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # Reusable components (including ShadCN UI components)
│   └── lib/
│       ├── features/      # The Redux logics for features (e.g., shopping cart)
│       ├── hooks/         # Custom React hooks
│       ├── store.ts       # Redux store
│       ├── utils.ts       # Utility functions
│   ├── styles/            # Tailwind CSS styles (global, utilities and fonts)
│   ├── types/             # TypeScript types
>>>>>>> 0113b73fcb7e8e7c1f6c776a6fb3f9cc2cdc10fd
│
├── components.json         # ShadCN UI configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Node.js dependencies and scripts
├── postcss.config.mjs      # Post CSS configuration
└── README.md               # Project documentation
<<<<<<< HEAD
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
```

## API Integration

The current implementation uses hardcoded product data. To connect to a real API:

1. Create API endpoints in the `src/app/api` directory
2. Update the product data fetching in `src/app/page.tsx` and other relevant pages
3. Modify the Redux slices to handle API responses
4. Implement proper error handling and loading states

## State Management

The application uses Redux Toolkit for state management:

- **Cart State**: Manages shopping cart items, quantities, and total prices
- **Product State**: Handles product selection, color, and size preferences
- **Persistence**: Uses Redux Persist to maintain cart data between sessions

## Deployment

To deploy this application:

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the production server:**

   ```bash
   npm start
   ```

The application can be deployed to platforms like Vercel, Netlify, or any hosting service that supports Next.js applications.

### Environment Variables

If connecting to external APIs, create a `.env.local` file with your environment variables:

```
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## Contributing

Contributions are welcome! If you'd like to contribute to Prime Containers, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a pull request

Please ensure your code follows the existing style and includes appropriate documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions, suggestions, or support regarding Prime Containers:

- **Project**: Prime Containers E-commerce Platform
- **Repository**: [https://github.com/your-username/PrimeContainers](https://github.com/your-username/PrimeContainers)
=======
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
```

## Contributing

Contributions are welcome! If you'd like to contribute, Please follow these steps to contribute to Shopco:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## Issues

Feel free to submit issues for any bugs, feature requests, or general questions related to the project. You can also reach out via [email](mailto:mr.mohammadoftadeh@gmail.com) for support.

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.

## Contact

Feel free to reach out to:

- **Name**: Mohammad Oftadeh
- **Email**: [mr.mohammadoftadeh@gmail.com](mailto:mr.mohammadoftadeh@gmail.com)
- **GitHub**: [https://github.com/mohammadoftadeh](https://github.com/mohammadoftadeh)
>>>>>>> 0113b73fcb7e8e7c1f6c776a6fb3f9cc2cdc10fd
