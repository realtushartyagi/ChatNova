import logo from "./logo.svg";
import logo_full from "./logo_full.svg";
import logo_full_dark from "./logo_full_dark.svg";
import search_icon from "./search_icon.svg";
import user_icon from "./user_icon.svg";
import theme_icon from "./theme_icon.svg";
import send_icon from "./send_icon.svg";
import stop_icon from "./stop_icon.svg";
import mountain_img from "./mountain_img.jpg";
import menu_icon from "./menu_icon.svg";
import close_icon from "./close_icon.svg";
import bin_icon from "./bin_icon.svg";
import logout_icon from "./logout_icon.svg";
import diamond_icon from "./diamond_icon.svg";
import gallery_icon from "./gallery_icon.svg";

import ai_image1 from "./ai_image1.jpg";
import ai_image2 from "./ai_image2.jpg";
import ai_image3 from "./ai_image3.jpg";
import ai_image4 from "./ai_image4.jpg";
import ai_image5 from "./ai_image5.jpg";
import ai_image6 from "./ai_image6.jpg";
import ai_image7 from "./ai_image7.jpg";
import ai_image8 from "./ai_image8.jpg";
import ai_image9 from "./ai_image9.jpg";
import ai_image10 from "./ai_image10.jpg";
import ai_image11 from "./ai_image11.jpg";
import ai_image12 from "./ai_image12.jpg";

export const assets = {
    logo,
    logo_full,
    search_icon,
    user_icon,
    theme_icon,
    send_icon,
    stop_icon,
    mountain_img,
    menu_icon,
    close_icon,
    bin_icon,
    logout_icon,
    logo_full_dark,
    diamond_icon,
    gallery_icon
};

export const dummyUserData = {
    "_id": "689c6deed410acddc0d95a0e",
    "name": "GreatStack",
    "email": "admin@example.com",
    "password": "$2b$10$VESVdPDjL5LF.KCU6jKyqeXNSLASAAfpR2kkIJExtMO.PJvZJAudy",
    "credits": 200,
}

// copy for server controllers
export const dummyPlans = [
    {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
];


export const dummyChats = [
    {
        "_id": "689de4bbaa932dc3a8ef6cd7",
        "userId": "689c6deed410acddc0d95a0e",
        "userName": "GreatStack",
        "name": "New Chat",
        "messages": [
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "a boy running on water",
                "timestamp": 1755178179612,
            },
            {
                "isImage": true,
                "isPublished": true,
                "role": "assistant",
                "content": ai_image11,
                "timestamp": 1755178194747,
            }
        ],
        "createdAt": "2025-08-14T13:29:31.398Z",
        "updatedAt": "2025-08-14T13:29:54.753Z",
    },
    {
        "_id": "689ccb9016a922dd57a23fce",
        "userId": "689c6deed410acddc0d95a0e",
        "name": "New Chat",
        "messages": [
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "hello ",
                "timestamp": 1755106415912,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "assistant",
                "content": "Hello! 😊 How can I assist you today?",
                "timestamp": 1755106420723,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "Generate a image of boy talking with others",
                "timestamp": 1755107475040,
            },
            {
                "isImage": true,
                "isPublished": true,
                "role": "assistant",
                "content": ai_image1,
                "timestamp": 1755107486680,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "i have to create a realistic image of jungle with wild animals so create a prompt for it",
                "timestamp": 1755158982894,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "assistant",
                "content": "Here's a detailed and structured prompt to generate a highly realistic jungle scene with wild animals:  \n\n---  \n\n**Prompt:**  \n*\"Ultra-realistic, hyper-detailed photorealistic jungle landscape teeming with wildlife. The setting is a dense, vibrant rainforest bathed in dappled sunlight filtering through the thick canopy. Towering ancient trees with intricate root systems, lush green ferns, vines, and exotic flowers create a rich, immersive environment. A clear, sparkling stream winds through the scene, reflecting the lush surroundings.  \n\nWildlife in their natural habitat:  \n- A majestic Bengal tiger crouches on a moss-covered rock near the water, muscles tensed as it watches for prey.  \n- A family of elephants moves gently through the undergrowth, led by a large matriarch with a protective stance.  \n- Colorful macaws and parrots perch on high branches, their bright feathers contrasting with the greenery.  \n- A stealthy jaguar lurks in the shadows, its golden eyes piercing.  \n- A troupe of playful monkeys swings from vines, their expressions lively and dynamic.  \n- A slow-moving sloth clings to a tree branch, blending into the foliage.  \n\nAtmospheric elements:  \n- Soft mist lingers near the forest floor, adding depth.  \n- Dragonflies and butterflies hover near the water's edge.  \n- Distant bird calls and rustling leaves create an immersive ambiance.  \n\nCinematic composition with balanced lighting—sunbeams piercing through the canopy in a god-ray effect. Depth of field focuses sharply on the tiger while softly blurring the background for realism. Shot with a high-resolution DSLR style for maximum detail, 8K quality. Ultra HD, National Geographic-style wildlife photography.\"*  \n\n---  \n\n### **Tips for Adjusting the Prompt:**  \n- **For a more serene scene:** Remove predators (like the jaguar) and focus on grazing animals like deer or tapirs.  \n- **For a darker, mysterious tone:** Add rain, stormy lighting, or a twilight setting.  \n- **For more biodiversity:** Include reptiles (snakes, frogs) or insects (beetles, spiders).  \n\nWould you like any modifications for a specific mood or artistic style (e.g., painterly, cinematic, or fantasy-inspired)?",
                "timestamp": 1755158995829,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "Ultra-realistic, hyper-detailed photorealistic jungle landscape teeming with wildlife. The setting is a dense, vibrant rainforest bathed in dappled sunlight filtering through the thick canopy. Towering ancient trees with intricate root systems, lush green ferns, vines, and exotic flowers create a rich, immersive environment. A clear, sparkling stream winds through the scene, reflecting the lush surroundings.  Wildlife in their natural habitat:  A majestic Bengal tiger crouches on a moss-covered rock near the water, muscles tensed as it watches for prey. A family of elephants moves gently through the undergrowth, led by a large matriarch with a protective stance. Colorful macaws and parrots perch on high branches, their bright feathers contrasting with the greenery. A stealthy jaguar lurks in the shadows, its golden eyes piercing. A troupe of playful monkeys swings from vines, their expressions lively and dynamic. A slow-moving sloth clings to a tree branch, blending into the foliage. Atmospheric elements:  Soft mist lingers near the forest floor, adding depth. Dragonflies and butterflies hover near the water's edge. Distant bird calls and rustling leaves create an immersive ambiance. Cinematic composition with balanced lighting—sunbeams piercing through the canopy in a god-ray effect. Depth of field focuses sharply on the tiger while softly blurring the background for realism. Shot with a high-resolution DSLR style for maximum detail, 8K quality. Ultra HD, National Geographic-style wildlife photography.",
                "timestamp": 1755159013677,
            },
            {
                "isImage": true,
                "isPublished": true,
                "role": "assistant",
                "content": ai_image2,
                "timestamp": 1755159034238,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "top web technologies to learn in 2025",
                "timestamp": 1755159074583,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "assistant",
                "content": "Here are the top web technologies to learn in 2025 to stay competitive in the industry:\n\n### **Frontend Development**  \n1. **React.js** – Still the dominant frontend library with increasing adoption of **React Server Components (RSC)** and **Next.js**.  \n2. **Next.js (v14+)** – Meta-framework for React enabling **server-side rendering (SSR)**, static site generation (SSG), and edge computing.  \n3. **Vue.js (v3.x + Vite)** – Growing ecosystem with better DX and performance.  \n4. **Svelte & SvelteKit** – Rising in popularity due to its compile-time reactivity and lightweight output.  \n5. **WebAssembly (WASM)** – Enables near-native performance for web apps (used in Figma, Photoshop, etc.).  \n\n### **Backend Development**  \n6. **Node.js (v20+)** – Still leading in JavaScript-based backend development.  \n7. **Deno & Bun** – Faster alternatives to Node.js with modern APIs (Bun is gaining traction for speed).  \n8. **Python (FastAPI, Django, Flask)** – Python remains strong for backend and AI-powered apps.  \n9. **Rust (Actix, Axum, Rocket)** – High-performance backend development with safety guarantees.  \n10. **Go (Golang)** – Valued for scalable backend systems (used by Uber, Twitch, Docker).  \n\n### **Full-Stack & Cloud-Native**  \n11. **GraphQL (Apollo, Relay)** – Alternative to REST for efficient API queries.  \n12. **Serverless (AWS Lambda, Vercel, Cloudflare Workers)** – Shift toward edge computing and serverless architectures.  \n13. **Web3 & Blockchain (Ethereum, Solana, Web3.js, Ethers.js)** – Emerging in decentralized apps (dApps).  \n14. **Microservices & Kubernetes** – Essential for scalable cloud-native apps.  \n\n### **CSS & Styling**  \n15. **Tailwind CSS** – Utility-first CSS framework dominating modern UI development.  \n16. **CSS Modules & CSS-in-JS (Emotion, Styled Components)** – Scoped styling for component-based apps.  \n17. **PostCSS & Modern CSS (Flexbox, Grid, Container Queries)** – Advanced styling techniques.  \n\n### **Database & State Management**  \n18. **PostgreSQL, MongoDB, & Edge Databases (PlanetScale, Neon, Supabase)** – SQL + NoSQL trends.  \n19. **Prisma, DrizzleORM** – Modern ORMs for TypeScript/Node.js.  \n20. **GraphQL Client State (RTK Query, Apollo Client, URQL)** – Managing data efficiently.  \n\n### **Emerging & Future-Proof Tech**  \n21. **AI & LLM Integration (OpenAI, LangChain)** – AI-powered web apps (ChatGPT plugins, copilots).  \n22. **Progressive Web Apps (PWAs + Web APIs)** – Offline-first, installable web apps.  \n23. **WebRTC & Real-Time (Socket.io, Liveblocks, PartyKit)** – Real-time collaboration features.  \n24. **3D & WebGL (Three.js, Babylon.js, React Three Fiber)** – Interactive 3D web experiences.  \n25. **Motion UI & Animation (GSAP, Framer Motion)** – Advanced web animations.  \n\n### **Must-Have Tools & DevOps**  \n- **Git, CI/CD (GitHub Actions, Vercel, Netlify)**  \n- **Docker & Kubernetes** (for containerization)  \n- **Testing (Vitest, Playwright, Cypress, Jest)**  \n\n### **Why Learn These in 2025?**  \n- **Speed & Efficiency**: Tools like **Bun, Rust, and WASM** optimize performance.  \n- **AI Integration**: AI is being embedded into web dev at a rapid pace.  \n- **Edge Computing & Serverless**: Cloud providers are pushing serverless/edge deployments.  \n- **Full-Stack Dominance**: Frameworks like **Next.js, SvelteKit, and Remix** blur frontend/backend lines.  \n\nFocus on **React + Next.js, Rust/Go for backend, TypeScript, and AI integrations** for maximum opportunities in 2025. 🚀  \n\nWould you like a tailored roadmap based on your goals?",
                "timestamp": 1755159100513,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "write a code for basic express app ",
                "timestamp": 1755159129597,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "assistant",
                "content": "# Basic Express.js Application\n\nHere's a simple Express.js application setup with some basic routes:\n\n```javascript\n// Import required modules\nconst express = require('express');\nconst path = require('path');\n\n// Create an Express application\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\n// Middleware\napp.use(express.json()); // For parsing application/json\napp.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded\n\n// Serve static files from the 'public' directory\napp.use(express.static(path.join(__dirname, 'public')));\n\n// Basic routes\napp.get('/', (req, res) => {\n  res.send('Welcome to the Express App!');\n});\n\napp.get('/about', (req, res) => {\n  res.send('About Page');\n});\n\n// Example route with parameters\napp.get('/user/:id', (req, res) => {\n  res.send(`User ID: ${req.params.id}`);\n});\n\n// Example POST route\napp.post('/api/data', (req, res) => {\n  console.log(req.body);\n  res.json({ message: 'Data received', data: req.body });\n});\n\n// 404 Error handler\napp.use((req, res) => {\n  res.status(404).send('404 - Not Found');\n});\n\n// Error handling middleware\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).send('Something went wrong!');\n});\n\n// Start the server\napp.listen(PORT, () => {\n  console.log(`Server is running on http://localhost:${PORT}`);\n});\n```\n\n## Setup Instructions\n\n1. Make sure you have Node.js installed\n2. Create a new directory for your project\n3. Initialize a new Node.js project:\n   ```bash\n   npm init -y\n   ```\n4. Install Express:\n   ```bash\n   npm install express\n   ```\n5. Save the code above in a file named `app.js`\n6. Create a `public` directory if you want to serve static files\n7. Start the server:\n   ```bash\n   node app.js\n   ```\n\n## Features\n- Basic routes ('/', '/about', '/user/:id')\n- POST route for handling form data\n- Static file serving\n- Error handling\n- JSON body parsing\n\nYou can expand this basic setup by adding more routes, connecting to a database, or adding middleware as needed.",
                "timestamp": 1755159145294,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "generate a image of gaming pc setup in a room in realistic style",
                "timestamp": 1755159264109,
            },
            {
                "isImage": true,
                "isPublished": true,
                "role": "assistant",
                "content": ai_image3,
                "timestamp": 1755159273878,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "what are web3",
                "timestamp": 1755159666525,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "assistant",
                "content": "**Web3** (or **Web 3.0**) refers to the next evolution of the internet, centered on **decentralization, blockchain technology, and user ownership of data**. It aims to shift control from large tech companies to users by leveraging cryptographic protocols and peer-to-peer networks.\n\n### **Key Features of Web3:**\n1. **Decentralization**  \n   - No single entity controls the internet; instead, it operates on distributed networks (like blockchains or peer-to-peer systems).\n   - Contrasts with Web2 (the current internet), dominated by centralized platforms like Google, Facebook, and Amazon.\n\n2. **Blockchain & Cryptocurrency**  \n   - Uses blockchain (e.g., Ethereum, Solana) for trustless transactions and smart contracts.\n   - Cryptocurrencies (e.g., Bitcoin, ETH) enable value transfer without intermediaries.\n\n3. **User Ownership & Digital Identity**  \n   - Users own their data (via **decentralized identity** solutions) and monetize it directly.\n   - NFTs (Non-Fungible Tokens) allow ownership of digital assets (art, music, virtual land).\n\n4. **Interoperability & Openness**  \n   - Applications (dApps) can interact seamlessly across different blockchains.\n   - Open-source protocols reduce reliance on proprietary platforms.\n\n5. **Tokenized Incentives**  \n   - Users and developers are rewarded with tokens (e.g., governance tokens, staking rewards).\n\n### **Examples of Web3 Technologies:**\n- **DeFi (Decentralized Finance)** – Peer-to-peer financial services (e.g., Uniswap, Aave).  \n- **NFTs & Digital Ownership** – CryptoPunks, OpenSea, and blockchain gaming.  \n- **DAOs (Decentralized Autonomous Organizations)** – Community-governed entities (e.g., MakerDAO).  \n- **Decentralized Storage** – IPFS, Filecoin (vs. centralized cloud storage like AWS).  \n\n### **Web3 vs. Web2 vs. Web1**\n- **Web1 (1990s-2000s):** Read-only static websites (e.g., early HTML pages).  \n- **Web2 (2000s-present):** Interactive, social media, cloud computing (Facebook, YouTube).  \n- **Web3 (emerging):** Decentralized, user-owned, token-based economies.  \n\n### **Challenges of Web3**\n- **Scalability:** Blockchains struggle with speed and cost (e.g., Ethereum gas fees).  \n- **Regulation:** Governments are still figuring out crypto laws.  \n- **User Experience:** Complex for non-technical users.  \n\nWould you like a deeper dive into any specific aspect? 🚀",
                "timestamp": 1755159683847,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "Generate a image nature with trees  in realistic style",
                "timestamp": 1755160243315,
            },
            {
                "isImage": true,
                "isPublished": true,
                "role": "assistant",
                "content": ai_image4,
                "timestamp": 1755160254161,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "a gaming pc setup ",
                "timestamp": 1755163772103,
            },
            {
                "isImage": true,
                "isPublished": true,
                "role": "assistant",
                "content": ai_image6,
                "timestamp": 1755163783470,
            },
            {
                "isImage": false,
                "isPublished": false,
                "role": "user",
                "content": "a streaming setup with mic and accessory's ",
                "timestamp": 1755163990514,
            },
            {
                "isImage": true,
                "isPublished": true,
                "role": "assistant",
                "content": ai_image7,
                "timestamp": 1755164001928,
            }
            
        ],
        "createdAt": "2025-08-13T17:29:52.421Z",
        "updatedAt": "2025-08-14T09:39:19.046Z",
        "userName": "GreatStack"
    },
    {
        "_id": Date.now(),
        "userId": "gs123456789",
        "name": "New Chat",
        "userName": "GreatStack",
        "messages": [],
        "createdAt": "2025-08-13T17:29:52.421Z",
        "updatedAt": "2025-08-14T09:39:19.046Z",
    }
]

export const dummyPublishedImages = [
    {
        "imageUrl": ai_image11,
        "userName": "GreatStack"
    },
    {
        "imageUrl": ai_image10,
        "userName": "GreatStack"
    },
    {
        "imageUrl": ai_image9,
        "userName": "GreatStack"
    },
    {
        "imageUrl": ai_image8,
        "userName": "GreatStack"
    },
    {
        "imageUrl": ai_image7,
        "userName": "GreatStack"
    },
    {
        "imageUrl": ai_image6,
        "userName": "GreatStack"
    },
    {
        "imageUrl": ai_image5,
        "userName": "GreatStack"
    },
    {
        "imageUrl": ai_image4,
        "userName": "GreatStack"
    },
    {
        "imageUrl": ai_image3,
        "userName": "GreatStack"
    },
    {
        "imageUrl": ai_image2,
        "userName": "GreatStack"
    },
    {
        "imageUrl": ai_image1,
        "userName": "GreatStack"
    }
]