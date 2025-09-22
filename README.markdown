# Codantix Tech

![Codantix Tech Logo](https://via.placeholder.com/150x50.png?text=Codantix+Tech) <!-- Replace with actual logo -->

Codantix Tech is a modern, responsive web application built with Next.js, showcasing scalable digital experiences for business growth and user engagement. It features a sleek sky-blue gradient theme (`sky-400` to `blue-800`), animated mountain backgrounds, and a professional design with a custom 404 page, footer, and smooth scrolling effects.

## Features

- **Responsive Design**: Adapts seamlessly to all screen sizes, from mobile to desktop.
- **Sky-Blue Gradient Theme**: Styled with Tailwind CSS, using `font-poppins` and gradients (`sky-400` to `blue-800`).
- **Animated Backgrounds**: Two SVG mountain animations in the footer and 404 page for a dynamic visual experience.
- **Custom 404 Page**: User-friendly error page with a "Back to Home" call-to-action.
- **SEO Optimized**: Includes `<head>` tags with title and meta description for search engine visibility.
- **Client-Side Interactivity**: Smooth scrolling with `ScrollProvider` and `ClientScrollbar` components.
- **Contact Options**: Phone number (`+92 335 2184071`), email, GitHub, and LinkedIn links in the footer.

## Project Structure

```
codantix-tech/
├── app/
│   ├── components/
│   │   ├── Footer.jsx          # Footer with branding, contact, and animated mountains
│   │   ├── ScrollProvider.js   # Custom scroll provider (assumed)
│   │   └── ClientScrollbar.js  # Custom scrollbar component (assumed)
│   ├── 404.jsx                 # Custom 404 page
│   ├── layout.js               # Root layout with fonts and client-side providers
│   └── globals.css             # Global styles (Tailwind CSS)
├── public/                     # Static assets (e.g., favicon.ico, images)
├── package.json                # Project dependencies
├── vercel.json                 # Vercel configuration
└── README.md                   # This file
```

## Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher
- **Git**: For cloning and pushing to GitHub

## Installation

1. **Clone the Repository** (after creating it):
   ```bash
   git clone https://github.com/your-username/codantix-tech.git
   cd codantix-tech
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to view the app.

## Dependencies

Key dependencies:
- `next`: ^15.5.3
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `next/font/google`: For `GeistSans` and `GeistMono` fonts
- `lucide-react`: For icons (GitHub, LinkedIn, Phone, etc.)
- `tailwindcss`: For styling
- `@tailwindcss/typography`: For enhanced text styling

Install them with:
```bash
npm install next@15.5.3 react@18.2.0 react-dom@18.2.0 next/font/google lucide-react@0.441.0 tailwindcss@3.4.10 @tailwindcss/typography@0.5.15
```

## Vercel Configuration

To deploy on Vercel, create a `vercel.json` file in the project root with the following configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "framework": "nextjs",
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

This configuration:
- Specifies Next.js as the framework.
- Sets up the build process using `npm run build`.
- Outputs the build to `.next`.
- Routes all requests to the Next.js app for proper handling.

## Deployment on Vercel

1. **Push to GitHub** (see below for instructions).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Create a new project and import your GitHub repository (`codantix-tech`).
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Deploy the project. Vercel will provide a live URL (e.g., `https://codantix-tech.vercel.app`).
6. Verify the deployment by visiting `/nonexistent` to check the 404 page.

## Uploading to GitHub

To upload the project to GitHub:

1. **Initialize a Git Repository** (in your project directory, e.g., `C:\Users\InteL\Desktop\Codantix\tech`):
   ```bash
   git init
   ```

2. **Create/Verify Files**:
   Ensure the following files are in place:
   - `app/layout.js`
   - `app/404.jsx`
   - `app/components/Footer.jsx`
   - `app/globals.css`
   - `vercel.json` (add the above configuration)
   - `README.md` (this file)

   **Stub Missing Components** (if `ScrollProvider.js` or `ClientScrollbar.js` don’t exist):
   ```javascript
   // app/components/ScrollProvider.js
   'use client';
   export default function ScrollProvider({ children }) {
     return <>{children}</>;
   }
   ```
   ```javascript
   // app/components/ClientScrollbar.js
   'use client';
   export default function ClientScrollbar() {
     return null;
   }
   ```

3. **Add Files**:
   ```bash
   git add .
   ```

4. **Commit Changes**:
   ```bash
   git commit -m "Initial commit: Codantix Tech Next.js project with Vercel config"
   ```

5. **Create a GitHub Repository**:
   - Go to [github.com](https://github.com) and create a new repository named `codantix-tech` (public or private).

6. **Link to Remote Repository**:
   ```bash
   git remote add origin https://github.com/your-username/codantix-tech.git
   ```

7. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```

8. **Verify**: Check your GitHub repository to confirm all files are uploaded.

## Testing

- **Development**: Run `npm run dev` and visit `http://localhost:3000/nonexistent` to test the 404 page.
- **Hydration Warning**: The `layout.js` uses `suppressHydrationWarning` to handle browser extension attributes (e.g., Grammarly). Test in an incognito window to confirm no issues.
- **Build**: Run `npm run build` to ensure no errors. If you see "module not found" for `next/font/google`, install it:
  ```bash
  npm install next/font/google
  ```

## Notes

- **Client Warning**: The `layout.js` uses `'use client'` to support `ScrollProvider` and `ClientScrollbar`. This may cause hydration warnings due to browser extensions. Test in incognito mode or consider moving client-side logic to a separate component if issues persist.
- **Styling**: Ensure `app/globals.css` includes Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --bgPrimary: #0f172a; /* slate-900 */
    --textSecondary: #d1d5db; /* slate-300 */
  }
  ```
- **Social Links**: Update placeholder URLs in `Footer.jsx` (`https://github.com`, `https://linkedin.com`, `mailto:contact@codantix.com`) with your actual links.
- **Logo**: Replace the placeholder logo URL in this README with your actual logo in `public/`.

## Contact

Reach out to Codantix Tech for support:
- **Email**: [contact@codantix.com](mailto:contact@codantix.com)
- **Phone**: [+92 335 2184071](tel:+923352184071)
- **GitHub**: [GitHub Profile](https://github.com)
- **LinkedIn**: [LinkedIn Profile](https://linkedin.com)

---

Made with ❤️ by the Codantix Tech team.