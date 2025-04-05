# Online Learning PLatform Skillup

Hello!

This is my project - an online platform for learning programming, where you can get detailed information about different courses at different prices. The platform has a convenient carousel with all courses, as well as the ability to filter them by category, price range and course duration. In addition, you can find answers to popular questions, read student reviews, and sign up for the course that best suits your needs. In the future, I plan to add a personal account with login authorization, where users will be able to save progress, view their courses and receive recommendations. The platform will also have the ability to download new courses so that people can not only learn new skills, but also receive certificates confirming their achievements. The platform has great potential, and I plan to constantly improve it for user convenience.

## Set up

Clone the repository

```bash
https://autocode.git.epam.com/bulahmarina697/capstone-project-template.git
```
 Navigate to the project directory

```bash
cd capstone-project-template
```

Install dependencies

```bash
npm install
```

## Running the Project

To compile your SCSS files into CSS, run the following command:

```bash
npm run compile
```

## Available Scripts

```bash
npm run compile
```
Compiles the SCSS files from the src/scss folder into CSS and places them in the dist/css folder.

```bash
npm run lint
```

Runs both ESLint and Stylelint to check for code quality issues in your project.

```bash
npm run lint:fix
```

Runs both ESLint and Stylelint with the --fix option, automatically fixing fixable issues in your JavaScript and CSS/SCSS files.

## Linting and Code Quality

I use ESLint to ensure that your JavaScript code follows best practices and stays free of errors. To run ESLint on your project:

```bash
npx eslint .
```
This will check all JavaScript files in your project for potential issues.

If you want to automatically fix fixable issues, run:
```bash
npx eslint . --fix
```

## Stylelint

I use Stylelint to ensure that your CSS/SCSS follows best practices and is correctly formatted. To run Stylelint:

```bash
npx stylelint '**/*.{css,scss}'
```

If you want to automatically fix fixable issues in your styles, run:
```bash
npx stylelint '**/*.{css,scss}' --fix
```

## Note on Linting Configurations

This project uses the following linting configurations:

- ESLint: The .eslintrc.json file defines the linting rules for JavaScript.

- Stylelint: The .stylelintrc.json file defines the linting rules for CSS/SCSS.

If you'd like to customize the linting rules, you can modify these configuration files.

## Support

For any issues, questions, or suggestions, feel free to write me bulahmarina697@gmail.com

## Author

Marina Bulakh

## Project Status

This project is actively maintained and is regularly updated with new features and improvements.

## License
[MIT](https://choosealicense.com/licenses/mit/)