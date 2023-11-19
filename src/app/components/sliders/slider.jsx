import React from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box
} from '@chakra-ui/react'

const CustomSlider = ({ defaultValue, min, max, step, handleChange, value }) => {
  return (
    <Slider 
      defaultValue={defaultValue} 
      min={min} 
      max={max} 
      step={step} 
      onChange={handleChange}
    >
      <SliderMark
        value={value}
        textAlign='center'
        color='white' 
        mt='-10' 
        ml='-5' 
        w='10'
      >
        {value}
      </SliderMark>
      <SliderTrack bg='white'>
        <Box position='relative' right={10} />
        <SliderFilledTrack bg='rgb(255,215,0)' />
      </SliderTrack>
      <SliderThumb boxSize={4} />
    </Slider>
  )
};

export default CustomSlider;