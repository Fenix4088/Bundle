import React from 'react';
import { Provider as AppNameStoreProvider } from 'react-redux'; // rename AppNameStoreProvider in <YourAppName>StoreProvider
import { store } from '@/store';
import { TestComponent } from '@/components/TestComponent';
import '@styles/index.scss';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <AppNameStoreProvider store={store}>
      <div id="app" className={styles.app} data-testid="app">
        App
      </div>
      <TestComponent />
    </AppNameStoreProvider>
  );
};

export { App };
