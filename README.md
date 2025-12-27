# 🌟 My Portfolio Website

> A modern, interactive portfolio website built with React, Three.js, and cutting-edge web technologies.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.182.0-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

## ✨ Features

- **🎨 Modern UI/UX** - Clean, responsive design with smooth animations
- **🌌 3D Graphics** - Interactive Three.js and Spline 3D elements
- **✉️ Contact Form** - Integrated email functionality with EmailJS
- **🎭 Particle Effects** - Dynamic particle backgrounds using tsParticles
- **🎯 Smooth Scrolling** - Seamless navigation with Lenis smooth scroll
- **📱 Fully Responsive** - Optimized for all devices and screen sizes
- **⚡ Lightning Fast** - Built with Vite for optimal performance
- **🎬 GSAP Animations** - Professional-grade animations and transitions

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd my-portfolio-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint checks        |

## 📦 Tech Stack

### Core

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router DOM 7.11.0** - Client-side routing

### Styling

- **TailwindCSS 4.1.18** - Utility-first CSS framework
- **DaisyUI 5.5.14** - Tailwind component library

### 3D & Animation

- **Three.js 0.182.0** - 3D graphics library
- **@react-three/fiber 9.4.2** - React renderer for Three.js
- **@react-three/drei 10.7.7** - Useful helpers for react-three-fiber
- **@splinetool/react-spline 4.1.0** - Spline 3D integration
- **GSAP 3.14.2** - Professional animation library
- **@tsparticles/react 3.0.0** - Particle effects

### User Experience

- **Lenis 1.3.16** - Smooth scrolling
- **React Icons 5.5.0** - Icon library
- **@emailjs/browser 4.4.1** - Email service integration

## 📁 Project Structure

```
my-portfolio-website/
├── public/                 # Static assets
├── src/
│   ├── assets/
│   │   └── images/        # Image assets
│   ├── components/
│   │   ├── common/        # Reusable components
│   │   │   ├── MobileNavTabs.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── sections/      # Page sections
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Skills.jsx
│   │   └── three/         # 3D components
│   │       └── ParticlesBackground.jsx
│   ├── hooks/             # Custom React hooks
│   │   └── useSmoothScroll.js
│   ├── layouts/           # Layout components
│   │   └── MainLayout.jsx
│   ├── pages/             # Page components
│   │   ├── ErrorPage.jsx
│   │   └── Home.jsx
│   ├── routes/            # Route configuration
│   │   └── Routes.jsx
│   ├── App.jsx            # Main app component
│   ├── App.css            # App styles
│   ├── index.css          # Global styles
│   └── main.jsx           # App entry point
├── eslint.config.js       # ESLint configuration
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
└── README.md              # You are here!
```

## 🎨 Sections

- **Hero** - Eye-catching landing section with 3D elements
- **About** - Personal introduction and background
- **Skills** - Technical skills and expertise
- **Projects** - Portfolio showcase
- **Contact** - Get in touch form
- **Footer** - Social links and information

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Configuration

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Add your credentials to your environment variables

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 👤 Author

**Sarwar Morshad**

- Website: [sarwarmorshad.dev](https://sarwarmorshad.dev/)
- GitHub: [Sarwar Morshad](https://github.com/SarwarMorshad)
- LinkedIn: [Sarwar Morshad](https://www.linkedin.com/in/sarwarmorshad/)

---

<p align="center">Made with ❤️ By Sarwar Morshad</p>
