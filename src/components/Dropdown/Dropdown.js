import React, { useEffect, useState } from 'react';
import './Dropdown.css';

const options = [
  { icon: '/icons/bag.svg' },
  { icon: '/icons/certificate.svg' },
  { icon: '/icons/camera.svg' },
  { icon: '/icons/game.svg' },
  { icon: '/icons/music.svg' },
  { icon: '/icons/noodles.svg' },
  { icon: '/icons/nosmoke.svg' },
  { icon: '/icons/outdoor.svg' },
  { icon: '/icons/platte.svg' },
  { icon: '/icons/ripple.svg' },
  { icon: '/icons/television.svg' },
  { icon: '/icons/tennis.svg' },
  { icon: '/icons/user.svg' },
  { icon: '/icons/award.svg' },
  { icon: '/icons/ball-american-football.svg' },
  { icon: '/icons/ball-baseball.svg' },
  { icon: '/icons/barbell.svg' },
  { icon: '/icons/beach.svg' },
  { icon: '/icons/bike.svg' },
  { icon: '/icons/book-2.svg' },
  { icon: '/icons/brand-telegram.svg' },
  { icon: '/icons/bulb.svg' },
  { icon: '/icons/candle.svg' },
  { icon: '/icons/candy.svg' },
  { icon: '/icons/christmas-tree.svg' },
  { icon: '/icons/coffee.svg' },
  { icon: '/icons/comet.svg' },
  { icon: '/icons/confetti.svg' },
  { icon: '/icons/device-gamepad.svg' },
  { icon: '/icons/friends.svg' },
  { icon: '/icons/house.svg' },
  { icon: '/icons/ice-skating.svg' },
  { icon: '/icons/leaf.svg' },
  { icon: '/icons/microphone-2.svg' },
  { icon: '/icons/microscope.svg' },
  { icon: '/icons/moon-stars.svg' },
  { icon: '/icons/mosque.svg' },
  { icon: '/icons/movie.svg' },
  { icon: '/icons/palette.svg' },
  { icon: '/icons/parachute.svg' },
  { icon: '/icons/plane.svg' },
  { icon: '/icons/premium-rights.svg' },
  { icon: '/icons/run.svg' },
  { icon: '/icons/scale.svg' },
  { icon: '/icons/school.svg' },
  { icon: '/icons/seeding.svg' },
  { icon: '/icons/sleigh.svg' },
  { icon: '/icons/smoking.svg' },
  { icon: '/icons/soup.svg' },
  { icon: '/icons/stethoscope.svg' },
  { icon: '/icons/terminal-2.svg' },
  { icon: '/icons/tools.svg' },
  { icon: '/icons/tools-kitchen.svg' },
  { icon: '/icons/users.svg' },
  { icon: '/icons/video.svg' },
  { icon: '/icons/walk.svg' },
  { icon: '/icons/wand.svg' },
  { icon: '/icons/work.svg' },
];

function Dropdown(props) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  function handleOptionSelect(option) {
    setSelectedOption(option);
    props.iconSelected(option);
    setIsOpen(false);
  }

  useEffect(() => {
    setSelectedOption(options[0]);
    props.iconSelected(options[0]);
  }, []);

  return (
    <div className="dropdown">
      <button
        className={
          !props.disabled ? 'dropdown-toggle' : 'dropdown-toggle-disabled'
        }
        type="button"
        onClick={() => {
          if (!props.disabled) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className="selected-icon">
          <img src={selectedOption.icon} className="h-5" />
        </span>
        <span className="selected-text">{selectedOption.label}</span>
        <span className="caret"></span>
      </button>
      <ul
        className={`dropdown-menu ${isOpen && !props.disabled ? 'show' : ''}`}
      >
        {options.map((option) => (
          <li key={option.value} onClick={() => handleOptionSelect(option)}>
            <span className="icon">
              <img src={option.icon} className="h-5" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
