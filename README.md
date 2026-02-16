# OpenSpot Capstone Project

Capstone project for real-time parking tracking at UTampa.

## Description

This system uses sensors to track cars entering and exiting the parking garage, separating student and faculty counts.

## Tech

1. Hardware Developer – Entrance Sensor: Lailani/Jack
   Responsible for the entrance detection system
   Designs and builds the entrance sensor unit
   Wires the sensor and microcontroller
   Programs detection logic for vehicles entering the garage
   Sends entry data to the backend via Wi-Fi
   Tests accuracy and prevents double-counting

2. Hardware Developer – Exit Sensor: Jack/Lailani
   Responsible for the exit detection system
   Designs and builds the exit sensor unit
   Uses the same hardware design as the entrance sensor
   Programs detection logic for vehicles exiting the garage
   Sends exit data to the backend via Wi-Fi
   Ensures the car count correctly decreases
   Having two separate hardware roles shows parallel development and accountability.

3. Backend Software Developer: Khalil Smith
   Responsible for the backend and system logic
   Builds the backend API (FastAPI or similar)
   Creates endpoints to receive sensor data
   Handles counting logic and validation
   Communicates with the database
   Provides endpoints for the frontend to fetch live data

4. Database Developer : Anthony
   Responsible for data storage and integrity
   Designs the database schema
   Creates and manages MySQL tables
   Stores sensor events and garage state
   Ensures accurate and consistent data
   Supports backend queries and updates

5. Frontend Developer – UI & Layout - Sayed/Dhwani
   Responsible for the website structure and design
   Builds the website layout using Next.Js (React), as well as Tailwind CSS for styling.
   Designs a clean, easy-to-read interface
   Focuses on usability and accessibility mainly for mobile, but desktop as well.
   Make the website easy to navigate, very minimalistic.
   Maybe add in a quick statistical analysis like (parking is usually busiest at X pm, and usually clear at x PM)

6. Frontend Developer – Data & Logic -Sayed/Dhwani
   Responsible for frontend functionality (connecting frontend interface to the live data as well as implementing real time updates)
   Writes JavaScript to connect the website to the backend
   Supabase for backend, live update behavior may require a subscription
   Fetches live parking data from the API
   Implements auto-refresh behavior
   Displays real-time values (cars inside, spots left, status)

## Team

Sayed, Jack, Anthony, Lailani, Dhwani, Khalil
