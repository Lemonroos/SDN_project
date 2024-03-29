import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
    />
  );
};

export default ErrorPage;


