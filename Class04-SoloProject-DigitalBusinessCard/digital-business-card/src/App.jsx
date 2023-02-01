import React from "react"
import "./App.css"
import Photo from "./components/Photo"
import Name from "./components/Name"
import Button from "./components/Button"

export default function App() {
  return (
      <div className="container">
        <Photo />
        <Name />
        <Button />
      </div>
  )
}