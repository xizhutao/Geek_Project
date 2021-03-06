import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from '@/store/index'
import './index.scss'
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from "antd";
import App from './App'
const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
    <Provider store={store}>
        <ConfigProvider locale={locale}>
            <App></App>
        </ConfigProvider>
    </Provider>

)