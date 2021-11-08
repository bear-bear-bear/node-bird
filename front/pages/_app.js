import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const SNSClone = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>SNS Clone</title>
    </Head>
    <Component />
  </>
);

SNSClone.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(SNSClone);
