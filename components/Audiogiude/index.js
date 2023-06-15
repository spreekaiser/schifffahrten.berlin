const flags = [
  {
    name: "deutsch",
    language: "de",
    icon: "🇩🇪",
  },
  {
    name: "english",
    language: "en",
    icon: "🇬🇧",
  },
  {
    name: "français",
    language: "fr",
    icon: "🇫🇷",
  },
  {
    name: "español",
    language: "es",
    icon: "🇪🇸",
  },
  {
    name: "italiano",
    language: "it",
    icon: "🇮🇹",
  },
];

export default function Audioguide({ onClick }) {
  return (
    <div>
      <h3>Sprache auswählen:</h3>
      {flags.map((flag) => {
        return (
          <div key={flag.language} onClick={onClick}>
            <span>{flag.name}</span>
            <span>{flag.icon}</span>
          </div>
        );
      })}
    </div>
  );
}
