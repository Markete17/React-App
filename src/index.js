import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import generateStore from './redux/store';

import ThemeProvider from './context/ThemeProvider';
import ChatProvider from './context/ChatProvider';
import { BrowserRouter } from 'react-router-dom';

// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const store = generateStore()

// 👇️ if you use TypeScript, add non-null (!) assertion operator
// const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <Provider store={store}> {/*Provider para usar REDUX en los componentes, tiene que rodear toda la App*/}
    <ChatProvider>
      <ThemeProvider>
          <BrowserRouter> {/*React Router V6*/}
          <App />
          </BrowserRouter>
      </ThemeProvider>
      </ChatProvider>
    </Provider>
    </StrictMode>,
);