"use client";

import { useState } from "react"; // React state for managing input text
import { useRouter } from "next/navigation"; // Next.js router for navigation

// UI components
import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Constants
// - COST_PER_UNIT → price per character
// - TEXT_MAX_LENGTH → max allowed characters
import { 
  COST_PER_UNIT, 
  TEXT_MAX_LENGTH
} from "@/features/text-to-speech/data/constants";


export function TextInputPanel() {

  const [text, setText] = useState("");     // State to store user input text

  const router = useRouter();   // Router instance for navigation

  // Function triggered when user clicks "Generate speech"
  const handleGenerate = () => {
    const trimmed = text.trim(); // remove extra spaces
    if (!trimmed) return;   // If empty → do nothing

    // Navigate to new page with text in URL
    router.push(`/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  return (

    // OUTER WRAPPER → gradient border effect
    <div className="
      rounded-[22px] 
      bg-linear-185 
      from-[#ff8ee3] from-15% 
      via-[#57d7e0] via-39% 
      to-[#dbf1f2] to-85% 
      p-0.5 
      shadow-[0_0_0_4px_white]
    ">

      {/* NOTE:
          Using exact px border-radius to make gradient border align properly.
          Tailwind rounded classes use calc() → can break smooth edges.
      */}

      {/* INNER CONTAINER */}
      <div className="rounded-4xl bg-[#F9F9F9] p-1">

        {/* MAIN CONTENT BOX */}
        <div className="space-y-4 rounded-2xl bg-white p-4 drop-shadow-xs">

          {/* TEXT INPUT AREA */}
          <Textarea
            placeholder="Start typing or paste your text here..."
            className="min-h-35 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            value={text} // bind state
            onChange={(e) => setText(e.target.value)} // update state
            
            maxLength={TEXT_MAX_LENGTH} // limit input length
          />

          {/* BOTTOM INFO SECTION */}
          <div className="flex items-center justify-between">

            {/* COST ESTIMATION BADGE */}
            <Badge variant="outline" className="gap-1.5 border-dashed">
              
              {/* Coin icon */}
              <Coins className="size-3 text-chart-5" />

              {/* If no text → show hint, else show estimated cost */}
              <span className="text-xs">

                {/* If no text → show hint */}
                {text.length === 0 ? (
                  "Start typing to estimate"
                ) : (
                  <>
                    {/* Estimated cost = length × cost per unit */}
                    <span className="tabular-nums">
                      ${(text.length * COST_PER_UNIT).toFixed(4)}
                    </span>{" "}
                    estimated
                  </>
                )}
              </span>
              
            </Badge>

            {/* CHARACTER COUNT */}
            <span className="text-xs text-muted-foreground">
              {/* formatted numbers */}
              {text.length.toLocaleString()} / {TEXT_MAX_LENGTH.toLocaleString()} characters
            </span>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="flex items-center justify-end p-3">

          {/* GENERATE BUTTON */}
          <Button
            size="sm"
            disabled={!text.trim()} // disable button if text is empty (after trimming)
            onClick={handleGenerate}
            className="w-full lg:w-auto"
          >
            Generate speech
          </Button>
        </div>
      </div>
    </div>
  )
}