"use client";

import { useState, useCallback } from "react";
import { triviaLevels, TriviaLevel } from "@/lib/trivia-data";

type GameState =
  | { phase: "menu" }
  | { phase: "playing"; levelIdx: number; questionIdx: number; score: number; selected: number | null; revealed: boolean }
  | { phase: "results"; levelIdx: number; score: number; total: number };

export default function TriviaPage() {
  const [game, setGame] = useState<GameState>({ phase: "menu" });

  const startLevel = useCallback((levelIdx: number) => {
    setGame({ phase: "playing", levelIdx, questionIdx: 0, score: 0, selected: null, revealed: false });
  }, []);

  const selectAnswer = useCallback((choiceIdx: number) => {
    setGame((prev) => {
      if (prev.phase !== "playing" || prev.revealed) return prev;
      const level = triviaLevels[prev.levelIdx];
      const correct = level.questions[prev.questionIdx].answer;
      return {
        ...prev,
        selected: choiceIdx,
        revealed: true,
        score: choiceIdx === correct ? prev.score + 1 : prev.score,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setGame((prev) => {
      if (prev.phase !== "playing") return prev;
      const level = triviaLevels[prev.levelIdx];
      if (prev.questionIdx + 1 >= level.questions.length) {
        return { phase: "results", levelIdx: prev.levelIdx, score: prev.score, total: level.questions.length };
      }
      return { ...prev, questionIdx: prev.questionIdx + 1, selected: null, revealed: false };
    });
  }, []);

  if (game.phase === "menu") {
    return <LevelMenu levels={triviaLevels} onSelect={startLevel} />;
  }

  if (game.phase === "results") {
    return (
      <Results
        level={triviaLevels[game.levelIdx]}
        score={game.score}
        total={game.total}
        onReplay={() => startLevel(game.levelIdx)}
        onMenu={() => setGame({ phase: "menu" })}
      />
    );
  }

  const level = triviaLevels[game.levelIdx];
  const q = level.questions[game.questionIdx];

  return (
    <div className="flex-1 overflow-y-auto bg-[#0f1923]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setGame({ phase: "menu" })}
            className="text-[#8899aa] hover:text-[#e8edf2] text-sm transition-colors"
          >
            &larr; Back
          </button>
          <span className="text-[#8899aa] text-sm font-medium">
            {level.name} &middot; {game.questionIdx + 1} / {level.questions.length}
          </span>
          <span className="text-[#4da6ff] text-sm font-semibold">
            Score: {game.score}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-[#1a2736] rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-[#4da6ff] rounded-full transition-all duration-300"
            style={{ width: `${((game.questionIdx + 1) / level.questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <h2 className="text-[#e8edf2] text-xl font-semibold mb-6 leading-relaxed">
          {q.question}
        </h2>

        {/* Choices */}
        <div className="flex flex-col gap-3 mb-8">
          {q.choices.map((choice, i) => {
            let bg = "bg-[#1a2736] hover:bg-[#243446] border-[#2a3a4e]";
            if (game.revealed) {
              if (i === q.answer) {
                bg = "bg-[#1a3a2a] border-[#3dd68c]";
              } else if (i === game.selected && i !== q.answer) {
                bg = "bg-[#3a1a1a] border-[#ff6b6b]";
              } else {
                bg = "bg-[#1a2736] border-[#2a3a4e] opacity-50";
              }
            }

            return (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                disabled={game.revealed}
                className={`w-full text-left px-5 py-4 rounded-xl border ${bg} text-[#e8edf2] text-base transition-all cursor-pointer disabled:cursor-default`}
              >
                <span className="text-[#8899aa] font-mono mr-3 text-sm">
                  {String.fromCharCode(65 + i)}.
                </span>
                {choice}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        {game.revealed && (
          <div className="flex justify-center">
            <button
              onClick={nextQuestion}
              className="px-8 py-3 bg-[#4da6ff] hover:bg-[#3d96ef] text-white font-semibold rounded-xl transition-colors"
            >
              {game.questionIdx + 1 >= level.questions.length ? "See Results" : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LevelMenu({ levels, onSelect }: { levels: TriviaLevel[]; onSelect: (i: number) => void }) {
  const icons = ["🎖️", "⚔️", "🏅"];

  return (
    <div className="flex-1 overflow-y-auto bg-[#0f1923]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-[#e8edf2] text-3xl font-bold mb-2 text-center">
          World War I Trivia
        </h1>
        <p className="text-[#8899aa] text-center mb-10">
          Test your knowledge of the Great War. Pick a level to begin.
        </p>

        <div className="flex flex-col gap-4">
          {levels.map((level, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className="flex items-center gap-5 p-6 bg-[#1a2736] hover:bg-[#243446] border border-[#2a3a4e] rounded-2xl transition-colors text-left cursor-pointer"
            >
              <span className="text-4xl">{icons[i]}</span>
              <div>
                <h3 className="text-[#e8edf2] text-lg font-semibold">
                  Level {i + 1}: {level.name}
                </h3>
                <p className="text-[#8899aa] text-sm mt-1">{level.description}</p>
                <p className="text-[#4da6ff] text-xs mt-1">{level.questions.length} questions</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Results({
  level,
  score,
  total,
  onReplay,
  onMenu,
}: {
  level: TriviaLevel;
  score: number;
  total: number;
  onReplay: () => void;
  onMenu: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  let message = "Keep studying, soldier!";
  if (pct >= 80) message = "Outstanding! You really know your history!";
  else if (pct >= 60) message = "Good work! You know your stuff.";
  else if (pct >= 40) message = "Not bad — room to improve!";

  return (
    <div className="flex-1 overflow-y-auto bg-[#0f1923]">
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">{pct >= 80 ? "🏆" : pct >= 50 ? "👏" : "📚"}</div>
        <h2 className="text-[#e8edf2] text-2xl font-bold mb-2">
          {level.name} Complete!
        </h2>
        <p className="text-[#8899aa] mb-6">{message}</p>

        <div className="bg-[#1a2736] border border-[#2a3a4e] rounded-2xl p-8 mb-8">
          <div className="text-5xl font-bold text-[#4da6ff] mb-1">
            {score}/{total}
          </div>
          <div className="text-[#8899aa] text-sm">{pct}% correct</div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onReplay}
            className="px-6 py-3 bg-[#4da6ff] hover:bg-[#3d96ef] text-white font-semibold rounded-xl transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onMenu}
            className="px-6 py-3 bg-[#1a2736] hover:bg-[#243446] border border-[#2a3a4e] text-[#e8edf2] font-semibold rounded-xl transition-colors"
          >
            All Levels
          </button>
        </div>
      </div>
    </div>
  );
}
