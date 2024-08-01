/**
 * Button component for navigation
 * @param {object} props - Component properties
 * @param {string} props.className - Class name for the button
 * @param {string} props.text - Text to display on the button
 * @param {function} props.onClick - Function to call when the button is clicked
 */
export default function ButtonComponent({ className, text, onClick }) {
  return (
    <>
      <button className={"btn nav-link " + className} onClick={onClick}>
        {text}
      </button>
    </>
  );
}
