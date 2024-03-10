import React from "react";
import Image from "next/image";
import { GoQuestion } from "react-icons/go";
import { SiOpensea } from "react-icons/si";

import { Tooltip } from "react-tooltip";

interface IDiscountCardProps {
  value: number;
}

const getColor = (value: number) => {
  if (value == 15) return "gold";
  if (value == 10) return "blue";
  return "green";
};

const DiscountCard: React.FC<IDiscountCardProps> = ({ value }) => {
  if (value == 0)
    return (
      <div className='flex items-center gap-2'>
        <div>No Discount</div>
        <div className='relative'>
          <GoQuestion id='noDiscountIcon' />
          <Tooltip anchorSelect='#noDiscountIcon' clickable place='right'>
            <>
              <div className='w-52'>
                <h3>Moon Pass Discount</h3>
                <p>
                  Holder of Moon Pass get discount on all Moon Ape Lab mints.
                  <br />
                  If you plan to mint more 3D Avatars, a Moon Pass might be a
                  good investment.
                  <br />
                  Check your favourite marketplace for availabilities.
                </p>
                <div>
                  <a
                    href='https://opensea.io/collection/moon-ape-lab-pass'
                    target='_blank'
                  >
                    <SiOpensea size={20} className='w-56' />
                  </a>
                </div>
              </div>
            </>
          </Tooltip>
        </div>
      </div>
    );
  return (
    <>
      <Image
        src={`https://storage.moonapelab.io/static/passes/thumbs/${getColor(
          value
        )}_pass.png`}
        alt='MoonPass from MoonApeLabs'
        width={100}
        height={100}
      />
    </>
  );
};

export default DiscountCard;
