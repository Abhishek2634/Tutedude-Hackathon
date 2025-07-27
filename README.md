# Annapurna: Bridging Vendors and Suppliers

Annapurna is a web-based platform designed to streamline the procurement process for street food vendors in India, connecting them with trusted and cost-effective raw material suppliers. This solution tackles the inefficiencies and lack of transparency in the existing supply chain, empowering small-scale entrepreneurs to thrive.

## The Challenge

In India, street food vendors are an integral part of the culinary landscape and local economy. However, they consistently face a significant operational hurdle: sourcing high-quality raw materials at competitive prices. The current system is often fragmented, relying on informal networks and middlemen, which leads to several challenges:
*   **Inconsistent Quality:** Difficulty in finding and verifying the quality of raw materials.
*   **Price Volatility:** Lack of transparent pricing, making vendors susceptible to fluctuating and often inflated costs.
*   **Untrustworthy Sources:** Building trust with new suppliers is a slow and often risky process.
*   **Logistical Hurdles:** Inefficient delivery and transportation systems add to the operational burden.

This project focuses on creating a digital ecosystem to alleviate these pain points, fostering a more organized and reliable supply chain for street food vendors.

## Our Solution

Annapurna is a digital marketplace that directly connects street food vendors with a network of verified suppliers. The platform is built to be intuitive and accessible, enabling vendors to easily manage their inventory needs while allowing suppliers to expand their customer base.

### Key Features
*   **Dual-Role System:** The platform supports two main user types: **Vendors** (buyers) and **Suppliers** (sellers).
*   **Secure Authentication:** User registration and login are secured using JSON Web Tokens (JWT), ensuring that all user data and transactions are protected.
*   **Vendor-Driven Orders:** Vendors can browse a catalog of raw materials (e.g., vegetables, spices, meats, packaging) and place orders for the specific items they need.
*   **Supplier Bidding System:** Once a vendor places a request, registered suppliers can view the order and submit their price quotations. This competitive bidding process helps vendors find the best rates.
*   **Data Management:** All user information, including vendor orders and supplier bids, is securely stored and managed in a MongoDB database.

## Tech Stack

The platform is built with a modern and robust technology stack to ensure scalability and a seamless user experience:
*   **Frontend:** Next.js
*   **Backend:** Next.js (API Routes)
*   **Database:** MongoDB
*   **Authentication:** JSON Web Tokens (JWT)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
*   Node.js (v14 or later)
*   npm or yarn
*   MongoDB instance (local or cloud-based)

### Installation
1.  Fork and Clone the repository:
    ```
    git clone https://github.com/{your_github_username}/Tutedude-Hackathon.git
    ```
2.  Install NPM packages:
    ```
    cd Tutedude-Hackathon
    npm install
    ```
3.  Set up environment variables. Create a `.env.local` file in the root directory and add the following:
    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
4.  Run the development server:
    ```
    npm run dev
    ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a standard Next.js structure:



## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
