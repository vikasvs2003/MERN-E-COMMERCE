import React, { useEffect, useState } from 'react'
import '../componentStyles/Rating.css'
import { SpaRounded } from '@mui/icons-material';
function Rating({ value, onRatingChange, disabled }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(value || 0);


    // Sync prop `value` with state
    useEffect(() => {
        setSelectedRating(value || 0);
    }, [value]);
    //Handle Star hovered 
    const handleMouseEnter = (rating) => {
        if (!disabled) {
            setHoveredRating(rating)
        }
    }

    //Mouse leave
    const handleMouseLeave = () => {
        if (!disabled) {
            setHoveredRating(0)
        }
    }
    //HandleClick
    const handleClick = (rating) => {
        if (!disabled) {
            setSelectedRating(rating)
            if (onRatingChange) {
                onRatingChange(rating)
            }
        }
    }

    // function to generate stars based on the selected rating 
    const generateStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= (hoveredRating || selectedRating);
            stars.push(
                <span
                    className={`star ${isFilled ? 'filled ' : 'empty'} `}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => (handleClick(i))}
                    style={{ pointerEvents: disabled ? 'none' : 'auto' }}
                >
                    ☆
                </span>
            )
        }
        return stars
    }
    return (
        <div className="rating">{generateStars()}</div>
    )
}

export default Rating