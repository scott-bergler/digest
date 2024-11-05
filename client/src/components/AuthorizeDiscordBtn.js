function AuthorizeDiscordBtn() {
  const addDiscord = () => {
    console.log("button is clicked");
  };
  return (
    <a
      href="https://discord.com/oauth2/authorize?client_id=1258848759706816512&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify"
      onClick={addDiscord}
    >
      Authorize Discord
    </a>
  );
}
export default AuthorizeDiscordBtn;
