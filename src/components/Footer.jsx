export default function Footer({ name }) {
  return (
    <footer className="bg-dark text-light text-center p-3 fixed-bottom">
      <p className="mb-0">&copy; 2024 - {name}</p>
    </footer>
  );
}
