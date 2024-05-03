'use client';
import { Provider } from 'react-redux';
import store from './store';

type Props = {
    children: any;
};
const Providers = ({ children }: Props) => {
    return <Provider store={store}>{children}</Provider>;
};

export default Providers;
