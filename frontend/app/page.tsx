export default function Home() {
    const players = ["Saqib", "Ali", "Omar"];

    return (
        <div>
            <h1>TeamSheet</h1>
            {players.map((player) => (
                <p key={player}>{player}</p>
            ))}
        </div>
    );
}