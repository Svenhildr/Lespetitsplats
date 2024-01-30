# 🚩 Les Petits Plats 2.0

# ***Cookbook Project - Recipe Search Engine***

## **📜 Project Overview**
After years of editing cookbooks, the company is venturing into a new project: creating its own recipe website similar to Marmiton or 750g. Sandra, the project manager, is leading the digitalization efforts, and as a freelance developer, you are tasked with implementing the recipe search functionality.

## 🚀 **Technologies Used**
JavaScript
Tailwind CSS

## **🏃‍♀️ How to Run**
Fork the Repository:
Work on a forked copy to avoid affecting the main repository.

Setting up Tailwind CSS:
Ensure Tailwind CSS is properly set up in your project. Follow the steps below:

1. **Install Tailwind CSS:**

    - Run the following command in your project's root directory to install Tailwind CSS and its dependencies:
        ```bash
        npm install tailwindcss@3.4.1 --save-dev
        ```

2. **Create a Configuration File:**

    - Create a Tailwind CSS configuration file named `tailwind.config.js` in your project's root directory. You can use the following command to generate the default configuration file:
        ```bash
        npx tailwindcss init --full
        ```

3. **Configure Stylesheet:**

    - Ensure that your project's main stylesheet (e.g., `styles.css` or `main.css`) imports Tailwind CSS. Add the following line at the top of your stylesheet:
        ```css
        @import "tailwindcss/base";
        @import "tailwindcss/components";
        @import "tailwindcss/utilities";
        ```

4. **Build Tailwind CSS:**

    - In your project's root directory, run the following command to build your Tailwind CSS styles:
        ```bash
        npx tailwindcss build -o dist/tailwind.css
        ```

    This will generate a compiled and optimized CSS file in the `dist/` directory.

5. **Include Compiled CSS:**
    - Link the compiled Tailwind CSS file (`tailwind.css`) in your HTML file, ensuring it is included before your custom styles. For example:
        ```html
        <link rel="stylesheet" href="dist/tailwind.css" /> <link rel="stylesheet" href="styles.css" />
        ```

Now, Tailwind CSS should be successfully set up in your project. Make sure to refer to the official [Tailwind CSS documentation](https://tailwindcss.com/docs/installation) for more detailed instructions and customization options.

## 🕵️‍♀️ **Code Overview**
- **JavaScript:**
Implement the search functionality using two different algorithms for performance comparison.

- **HTML/CSS:**
Create a visually appealing and responsive interface, adhering to the Figma mockup.
Utilize Tailwind CSS for styling; avoid using other libraries for CSS functionalities.

## **✏️ Development Notes**
Refer to the provided use case document for the search functionality to guide your development.
Utilize the 50 placeholder images for recipes in the provided folder for a faithful rendering of the mockup.

## **📊 Tasks Overview**

- **Interface Implementation:**
Begin by implementing the user interface using HTML and Tailwind CSS.

- **Algorithm Planning:**
Plan two versions of the search functionality using native loops and functional programming with array methods.
Create a document detailing the planned implementations, including algorithm flowcharts.

- **Algorithm Implementation:**
Implement both versions of the search functionality on separate Git branches, following the technical information provided by Sandra.

- **Code Optimization:**
Adhere to Green Code best practices, breaking down the code into reusable functions.
Pay special attention to security considerations, avoiding HTML tag injection and other vulnerabilities.

- **Performance Testing:**
Test the performance of both algorithms using a comparison tool such as Jsben.ch.
Document the results in the feature investigation sheet, and conclude with a recommendation for the preferred algorithm based on analysis and tests.
