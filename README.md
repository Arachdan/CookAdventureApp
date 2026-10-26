# CookAdventureApp

CookAdventureApp is a mobile app MVP built with React Native and Expo that combines recipe management with a gamified progression system. The application allows users to add recipes, track cooking progress, manage personal goals, and progress through a lightweight RPG-inspired leveling mechanic.

The project is designed as a local-first prototype and focuses on proving the core gameplay loop, state management, navigation flow and persistence model.

## Overview

The app includes:
- Recipe creation with title, ingredients, and preparation steps
- Local data persistence using AsyncStorage
- Experience and leveling mechanics
- Character profile and personalization
- Goal tracking
- Navigation between app screens
- Redux-driven state handling for game progression

https://github.com/user-attachments/assets/32ffdced-9558-4975-87af-beac0d23e105

## Tech Stack

- React Native
- Expo
- JavaScript
- Redux
- Redux Toolkit
- React Navigation
- AsyncStorage
- react-native-progress

## Key Features

### Recipe Management
Users can add custom recipes with:
- recipe title
- ingredients
- cooking instructions

<img width="360" height="760" alt="pid3" src="https://github.com/user-attachments/assets/c6ee0eae-cc47-4d78-8859-fbdcc7c3c451" />

&nbsp;

Recipes are stored locally and displayed in a recipe list.

<img width="360" height="760" alt="pid2" src="https://github.com/user-attachments/assets/2a402854-d88d-4e7d-a667-0f1ad0200e49" />

### Progression System
The app includes an experience-based progression model:
- experience points
- required experience threshold
- level progression
- stat updates after cooking actions

### Character Profile
The profile screen supports:
- current player name
- personal goal tracking
- level display
- experience bar visualization
- color palette customization
- language change
- reset functionality

<img width="360" height="682" alt="pid1" src="https://github.com/user-attachments/assets/7bf7323e-536d-45aa-bc38-6f63029423d1" />

### Local Persistence
The project stores player state and recipe data locally with AsyncStorage, making it suitable for a prototype that does not depend on a backend.

## MVP Status

This project is currently an MVP/prototype focused on:
- validating the core concept
- implementing local app state management
- creating a functional user flow

## State Management

The application uses Redux for app-wide state updates related to:
- experience points
- required experience
- level
- personal goal
- player name

This allows progression changes to be handled consistently across screens.

## Persistence Model

The current implementation stores relevant data locally in AsyncStorage, including:
- player progression values
- recipe list
- personal goal
- player name

<img width="360" height="666" alt="pid4" src="https://github.com/user-attachments/assets/06888bf8-0059-40b4-90b3-aa894c0a465f" />
