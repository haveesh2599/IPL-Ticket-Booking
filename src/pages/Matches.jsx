import { useEffect, useState } from "react";
import { supabase } from "../supabase";
function MatchCard(props) {
    return (
        <div className="match-card">

            <h2>
                {props.team1} vs {props.team2}
            </h2>

            <p>📍 {props.venue}</p>

            <p>📅 {props.date}</p>

            <button>Book Ticket</button>

        </div>
    );
}

function Matches() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const { data, error } = await supabase
                .from("matches")
                .select("*");

            if (error) {
                console.error("Error fetching matches:", error);
            } else {
                setMatches(data);
            }
        };

        fetchMatches();

        const channel = supabase.channel("matches_channel").on(
            "postgres_changes",
            { event: "*", schema: "public", table: "matches" }, 
            (payload) => {
                console.log("Realtime change:",payload);
                fetchMatches();
            }
        )
        .subscribe((status) => {console.log("Realtime status:",status)});

       return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <main className="matches-page">

            <h1>Upcoming IPL Matches</h1>

            <div className="matches-grid">
                {matches.map((match) => (
                    <MatchCard
                        key={match.id}
                        team1={match.team1}
                        team2={match.team2}
                        venue={match.venue}
                        date={match.date}
                    />
                ))}
            </div>

        </main>
    );
}
export default Matches;
