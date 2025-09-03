# Earthquake Rescue Locator for Myanmar

A responsive web application to help locate missing persons during Earthquakes. users can pinpoint a person's location on the map and add details as name, age, and noticable mark.

## Features

- Pin missing persons on a map
- Add personal details: name, age, noticeable marks
- Open-source under **GNU 3.0 license**
- Mobile responsive

## Tech Stack

- Frontend: Next.js + TypeScript + TailwindCSS
- Backend: Node.js + MongoDB

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Install & Run

You can use the provided shell script to install dependencies and start both servers:

```bash
chmod +x run_backend.sh & chmod +x run_frontend.sh
./run_backend.sh and
./run_frontend.sh
```

#### Add Missing Person

```http
    GET /api/person/rescue/add
```

| Parameter     | Type     | Description              |
| :------------ | :------- | :----------------------- |
| `name`        | `string` | **Required**.            |
| `location`    | `string` | **Required**.            |
| `notice_mark` | `string` | **Required**.            |
| `image`       | `string` | **Not Implemented Yet**. |

#### Get Missing Person

```http
  GET /api/persons/lists
```

| Parameter | Type   | Description |
| :-------- | :----- | :---------- |
| `none`    | `none` | none        |

---

## Thank You

Thank you for contributing to this project! Your support and contributions help make this project better for everyone.

If you find any issues or have suggestions, feel free to open an [issue](#) or submit a pull request. We really appreciate your help! 🙏
