import HelpChat from './HelpChat';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <HelpChat />
    </>
  );
}
