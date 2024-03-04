# Handshake-H1B-Checker

## Overview
The Handshake-H1B-Checker is a chrome extension designed to enhance the job search experience on the Handshake platform for international students and professionals seeking employment opportunities in the United States. This tool integrates seamlessly with Handshake's job search features, providing users with valuable insights into which companies have a history of filing H1B visa applications. This additional layer of information helps users to focus their job search efforts on employers more likely to sponsor their visa application, thereby increasing their chances of securing employment in the U.S.

## Features
- **H1B Filing History:** Quickly identify which companies have previously filed for H1B visas.
- **Seamless Integration:** Works within the Handshake platform to enhance your job search experience.
- **User-Friendly:** Simple and intuitive interface, requiring minimal setup.
- **Real-Time Data:** Utilizes the latest available data to provide up-to-date information on H1B filings.
- **Filtering Options:** Users can filter job listings based on the company's history of H1B filings.

## How It Works
The Handshake-H1B-Checker queries a local database containing historical data on H1B filings and matches this information with the companies listed on the Handshake job search platform. When a user searches for job opportunities, the tool displays an indicator next to each company name, showing whether that company has a history of H1B filings. This allows users to quickly and easily identify potential employers that are more likely to offer H1B sponsorship.

## Installation

1. **Clone the Repository**

    ```
    git clone https://github.com/yourusername/handshake-h1b-checker.git
    ```

2. **Open the Chrome Browser**

First, launch Google Chrome on your computer.

3. **Access the Extensions Page**

You can access the Extensions page in two ways:

- Navigate directly by typing `chrome://extensions/` in your Chrome browser's address bar.
- Alternatively, click on the menu icon (three vertical dots) in the upper right corner of the Chrome window, then go to **More tools > Extensions**.

4. **Enable Developer Mode**

On the Extensions page, you will find a toggle switch for **Developer mode** in the top right corner. Make sure this is turned on. Enabling Developer Mode allows you to see additional options such as "Load unpacked", "Pack extension", and "Update".

5. **Load Your Extension**

With Developer Mode enabled, follow these steps to load your extension:

1. Click on the **Load unpacked** button. This button becomes available only after you enable Developer Mode.
2. A file dialog will appear. Navigate to the directory where this Chrome extension is cloned. This directory must contain the `manifest.json` file of this extension.
3. Select the folder and click **OK** or **Open** (the button name depends on your operating system). Chrome will then load your extension.

## Usage
After installation, the Handshake-H1B-Checker will automatically integrate with the Handshake platform. When searching for jobs, look for the H1B indicator next to company names to identify potential H1B sponsors.

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments
- [Handshake](https://www.joinhandshake.com/) for providing the platform.
- [United States Department of Labor](https://www.dol.gov/) for H1B filing data.

## Disclaimer
This tool is not affiliated with, endorsed by, or sponsored by Handshake or any government agency. It is developed to assist job seekers in their search for H1B sponsorship opportunities.
