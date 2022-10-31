import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import getStudents from "../services/instructors";

const students = getStudents();

const MyCarousel = () => (
  <div>
    This is the list of all students
    <Carousel
      autoPlay
      axis="horizontal"
      showIndicators
      useKeyboardArrows
      showArrows
      stopOnHover
    >
      {students.map((student) => (
        <div key={student.id}>this is the {student.id}th element</div>
      ))}
    </Carousel>
  </div>
);

export default MyCarousel;
