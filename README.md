# NASA Space Explorer

NASA Space Explorer is a static, front-end web application that showcases space media from NASA's Astronomy Picture of the Day (APOD) API. The app combines a polished visual layout, a responsive gallery, and a dynamic facts section to deliver an immersive astronomy browsing experience.

## What the App Does

- Lets users select a date within the supported NASA APOD range (June 16, 1995 to today).
- Fetches a 9-day APOD gallery ending on the selected date.
- Displays image and video cards in a responsive grid.
- Opens a detailed modal with larger media, title, date, and explanation when a card is clicked.
- Shows a random space fact in the header each time the gallery is refreshed.
- Uses only browser-based HTML, CSS, and JavaScript with no Node.js backend.

## Layout and Design

The website is structured around clean, semantic sections:

- **Header:** Includes the NASA logo, app title, subtitle, and a space fact panel.
- **Controls:** Contains a date picker and a button to fetch APOD media.
- **Gallery:** Responsive grid layout that adapts to different screen sizes, displaying cards for each day.
- **Modal:** Overlay that presents a focused view of selected media with supporting details.
- **Footer:** Project attribution featuring ASU and NASA logos, plus developer credit for Vedant Patel.

The styling uses BEM naming conventions and a NASA-inspired palette with strong contrast, clean spacing, and smooth hover transitions.

## API Usage

This app relies on two APIs:

- **NASA APOD API:** Fetches astronomy images and videos for 9 consecutive days based on the selected end date.
- **Random facts API:** Retrieves space-themed trivia for the header "Did you know?" section each time the gallery is refreshed.

The API calls are made directly from the browser using modern `fetch` and `async/await` patterns.

## Key Features

- Responsive gallery with equal-height cards
- Image/video detection for proper media rendering
- Smooth hover and click interactions
- Modal detail view with media, title, date, and explanation
- Random space facts loaded on demand
- Local ASU and NASA branding in the footer
- No Node.js dependencies required

## Project Structure

```
NASA Space Explorer/
├── index.html
├── css/
│   ├── style.css
│   ├── normalize.css
│   └── blocks/
│       ├── header.css
│       ├── controls.css
│       ├── gallery.css
│       ├── card.css
│       ├── modal.css
│       └── footer.css
├── js/
│   └── script.js
└── images/
    └── asu_sunburst_logo_mobile_125px.png
```

## Notes

- The app is built as a static front-end project and does not require a Node.js environment.
- All layout, styling, and API logic runs in the browser.
- The NASA APOD API key is embedded in the client-side script for demonstration purposes.
