// rfce : React functional component export
import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import numeral from 'numeral';
import "./InfoBox.css";

function InfoBox({ title, cases, total, ...props }) {
  return (
    <Card onClick={props.onClick} className="infoBox">
        <CardContent>
            <Typography className="infoBox__title" color="textSecondary">
                <strong>{title}</strong>
                </Typography>

            <h2 className="infoBox__cases">+{numeral(cases).format("0.0a")}</h2>
            
            <Typography className="infoBox__total" color="textSecondary">
                +{numeral(total).format("0.0a")} Total
            </Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox