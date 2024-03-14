import React from "react";
interface IDiscountCardProps {
  color: string;
}

const DiscountCard: React.FC<IDiscountCardProps> = ({color}) => {

  return(
    <>
      <img src={`https://storage.moonapelab.io/static/passes/thumbs/${color}_pass.png`} />
    </>
  )

};

export default DiscountCard;