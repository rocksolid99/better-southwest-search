import React from "react";
import { Card, Row, Col, Tooltip } from "antd";
import {
  formatDuration,
  formatDepartureDate,
  formatFareValue,
  getLayoverDuration
} from "../helpers/formatters";
import moment from "moment";

const FlightResult = ({ flightProduct }) => {
  const {
    departureDateTime,
    departureAirportCode,
    arrivalDateTime,
    arrivalAirportCode,
    connectionAirportCode,
    segments,
    durationMinutes,
    currencyType,
    fareValue,
    seatsAvailable
  } = flightProduct;
  const departureTime = moment(departureDateTime).format("h:mm A");
  const arrivalTime = moment(arrivalDateTime).format("h:mm A");
  const axisStyle = { height: "2px", backgroundColor: "#93ff79", width: "70%" };
  const priceStyle = {
    fontSize: "1.2rem",
    textAlign: "right"
  };
  return (
    <Card style={{ marginTop: 16 }} hoverable={true}>
      <Row type="flex" justify="start" align="middle">
        <Col span={3}>{formatDepartureDate(departureDateTime)}</Col>
        <Col span={3} style={{ textAlign: "right", display: "inline-block" }}>
          <div>{departureTime}</div>
          <div>{departureAirportCode}</div>
        </Col>
        <Col span={5} align="center">
          <span
            style={{
              height: 21,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <span style={axisStyle} />
            {connectionAirportCode !== undefined && (
              <Tooltip
                title={`${
                  segments.length > 1
                    ? getLayoverDuration(segments)
                    : "No plange change"
                } layover in ${connectionAirportCode}`}
              >
                <span
                  style={{ border: "1px solid #262626", position: "absolute" }}
                >
                  <span
                    style={{
                      display: "block",
                      border: "2px solid #2ee600",
                      width: 8,
                      height: 8,
                      backgroundColor: "#262626"
                    }}
                  />
                </span>
              </Tooltip>
            )}
          </span>
          <span>{connectionAirportCode || "nonstop"}</span>
        </Col>
        <Col span={3} style={{ display: "inline-block" }}>
          <div>{arrivalTime}</div>
          <div>{arrivalAirportCode}</div>
        </Col>

        <Col span={3} style={{ textAlign: "center" }}>
          {formatDuration(durationMinutes)}
        </Col>
        <Col span={5}>
          <div style={priceStyle}>
            {formatFareValue(currencyType, fareValue)}
          </div>
          <div style={{ fontSize: ".8rem", textAlign: "right" }}>
            {seatsAvailable} seats avail.
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default FlightResult;
