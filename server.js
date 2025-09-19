import express from "express";
import { configDotenv } from "dotenv";
import axios from "axios";

configDotenv();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome",
  });
});

app.post("/whatsapp/template", async (req, res) => {
  try {
    const response = await axios.post(
      process.env.MESSAGING_ENDPOINT,
      JSON.stringify({
        messaging_product: "whatsapp",
        to: "+919696014751",
        type: "template",
        template: {
          name: "hello_world",
          language: { code: "en_US" },
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    if (!response) {
      const error = new Error("Bad request error. Try again!");
      error.statusCode = 403; // bad request
      throw error;
    }

    res.status(201).json({
      status: response.status,
      message: response.statusText,
      data: response.data,
    });
  } catch (err) {
    res.status(err.response.status).json({
      message: err.message,
    });
  }
});

app.post("/whatsapp/text", async (req, res) => {
  try {
    const response = await axios.post(
      process.env.MESSAGING_ENDPOINT,
      JSON.stringify({
        messaging_product: "whatsapp",
        to: "+919696014751",
        type: "text",
        text: {
          body: "Hello world. This is a text message session",
        },
      }),
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response) {
      const error = new Error("Bad request. Try again");
      error.statusCode = 403;
      throw error;
    }
    res.status(200).json({
      status: response.status,
      message: response.statusText,
      data: response.data,
    });
  } catch (err) {
    res.status(err.response.status).json({
      message: err.message,
    });
  }
});

app.post("/whatsapp/image", async (req, res) => {
  // get the data from request
  const imageLink = req.body.image;
  const imageCaption = req.body.caption;

  try {
    const response = await axios.post(
      process.env.MESSAGING_ENDPOINT,
      JSON.stringify({
        messaging_product: "whatsapp",
        to: "+919696014751",
        type: "image",
        image: {
          link: imageLink,
          caption: imageCaption,
        },
      }),
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response) {
      const error = new Error(
        "something went wrong here. Verify and try again"
      );
      error.statusCode = 403;
      throw error;
    }

    // else
    res.status(200).json({
      status: response.status,
      message: response.statusText,
      data: response.data,
    });
  } catch (err) {
    res.status(err.response.status).json({
      message: err.message,
    });
  }
});

app.listen(
  (process.env.NODE_ENV === "development" && process.env.PORT) || 3000
);
