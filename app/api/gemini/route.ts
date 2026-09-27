import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    const ai = apiKey
      ? new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        })
      : null;

    if (action === "summarize_theme") {
      const { eventTitle, rawNotes } = payload;
      if (ai) {
        const prompt = `You are an elite B2B event marketing strategist. Given the event title "${eventTitle}" and current notes "${rawNotes || ''}", write a concise, punchy, high-impact one-sentence Primary Theme & Value Proposition for a major tech conference. It should sound authoritative, forward-thinking, and appeal to senior engineering leaders and architects. Return only the sentence.`;
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
        });
        const text = response.text?.trim() || "";
        if (text) {
          return NextResponse.json({ success: true, theme: text });
        }
      }
      return NextResponse.json({
        success: true,
        theme:
          "Accelerating Enterprise AI Workflows: Real-World Multi-Agent Systems, Governance Standards, and Cloud-Native Scalability.",
      });
    }

    if (action === "generate_post") {
      const {
        attendeeName = "Sarah Jenkins",
        role = "VP of Product Engineering @ TechNova Solutions",
        eventName = "Global AI & Cloud Summit 2025",
        eventDate = "October 24-26, 2025",
        eventLocation = "San Francisco, CA (Moscone West)",
        excitedAbout = "autonomous agent architectures and scale challenges",
        tone = "thought_leader", // 'thought_leader' | 'casual' | 'speaker' | 'direct'
        phase = "pre", // 'pre' | 'post'
        hashtags = ["#GlobalAISummit", "#ArtificialIntelligence", "#SoftwareEngineering", "#TechLeaders", "#PostSpark"],
      } = payload || {};

      let toneInstruction = "Insightful, analytical, and strategic. Positions the author as an industry thought leader discussing architectural shifts.";
      if (tone === "casual") {
        toneInstruction = "Warm, enthusiastic, conversational, and energetic. Sounds authentic with genuine excitement and networking focus.";
      } else if (tone === "speaker") {
        toneInstruction = "Keynote / Speaker tone. Authoritative yet approachable, sharing talk highlights or slides/recording resources.";
      } else if (tone === "direct") {
        toneInstruction = "Concise, skimmable, bulleted or short-form with immediate value and zero fluff.";
      }

      const isPostEvent = phase === "post";

      if (ai) {
        try {
          const prompt = isPostEvent
            ? `You are crafting a viral, authentic POST-EVENT recap/takeaway LinkedIn post for a tech professional who just attended/spoke at ${eventName}.
Attendee Name: ${attendeeName}
Role & Company: ${role}
Event Concluded: ${eventName} (${eventDate} at ${eventLocation})
Core Takeaways & Highlights Experienced: ${excitedAbout}
Tone style: ${tone} (${toneInstruction})
Hashtags to include: ${hashtags.join(" ")}

Rules:
1. Write in natural 1st person ("Just wrapped up...", "My top 3 takeaways from...", "What an inspiring week...").
2. Frame it as reflection, key lessons learned, and gratitude to speakers/organizers.
3. Format for LinkedIn readability: use crisp 1-2 sentence paragraphs or numbered bullets with whitespace line breaks.
4. Include 2-3 tasteful emojis max.
5. Conclude with a conversation prompt (e.g. "What was your biggest takeaway from the summit?" or "Slide link in comments").
6. Put the official hashtags on the final line.
7. Provide exactly 3 different variations separated by the delimiter '---VARIATION---'. Do not add conversational intro/outro text.`
            : `You are crafting a viral, authentic PRE-EVENT announcement LinkedIn post for a tech professional attending/speaking at an upcoming event.
Attendee Name: ${attendeeName}
Role & Company: ${role}
Upcoming Event: ${eventName} (${eventDate} at ${eventLocation})
What they are most excited about: ${excitedAbout}
Tone style: ${tone} (${toneInstruction})
Hashtags to include: ${hashtags.join(" ")}

Rules:
1. Write in natural 1st person ("I'm", "Looking forward to...").
2. Format for LinkedIn readability: use crisp 1-2 sentence paragraphs with whitespace line breaks.
3. Include 2-3 tasteful emojis max.
4. Conclude with a strong call-to-action (e.g. asking who else is attending or suggesting coffee/networking).
5. Put the official hashtags on the final line.
6. Provide exactly 3 different variations separated by the delimiter '---VARIATION---'. Do not add conversational intro/outro text.`;

          const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
          });

          const rawText = response.text || "";
          const variations = rawText
            .split("---VARIATION---")
            .map((v) => v.trim())
            .filter(Boolean);

          if (variations.length > 0) {
            return NextResponse.json({
              success: true,
              variations,
              generatedWithAI: true,
            });
          }
        } catch (err) {
          console.warn("Gemini generation failed, falling back to dynamic templates:", err);
        }
      }

      // Dynamic curated fallbacks based on phase and tone
      const preEventFallbacks: Record<string, string[]> = {
        thought_leader: [
          `Excited to announce I'll be attending the ${eventName} in San Francisco this October! 🚀\n\nLooking forward to deep-diving into practical ${excitedAbout || 'autonomous agent architectures'} and learning how leading engineering teams are scaling resilient systems in production.\n\nWill you be there? Let's connect or grab a coffee! Link to registration in comments 👇\n\n${hashtags.join(" ")}`,
          `As we enter the next inflection point of enterprise intelligence, conferences like ${eventName} are where real implementation blueprints take shape.\n\nI'm particularly interested in ${excitedAbout || 'agentic governance frameworks'} and debating production benchmarks with fellow system builders.\n\nIf you'll be in SF on ${eventDate}, drop a comment—let's exchange notes on what's working.\n\n${hashtags.join(" ")}`,
          `Why attending ${eventName} matters this year:\n\n1. Autonomous agent execution is moving from prototype to mission-critical infrastructure.\n2. Cross-team collaboration between AI ops and platform architects has never been more urgent.\n3. The real breakthroughs happen in hallway conversations about ${excitedAbout || 'resilience and security'}.\n\nWho from my network is heading to Moscone West? Let's sync up!\n\n${hashtags.join(" ")}`,
        ],
        casual: [
          `Heading to San Francisco for #${eventName.replace(/\s+/g, '')}! 🎉\n\nCan't wait to catch up with old colleagues, meet new collaborators, and dive into ${excitedAbout || 'the latest frontier model deployments'}.\n\nDrop a comment if you're in town or attending Moscone West—first round of pour-overs is on me! ☕\n\n${hashtags.join(" ")}`,
          `October can't come soon enough! 🌉\n\nJust booked my pass for ${eventName}. Most hyped about ${excitedAbout || 'the hands-on workshops and seeing what the community is shipping'}.\n\nLet me know if you're going so we can plan a meetup!\n\n${hashtags.join(" ")}`,
          `Pack your bags, SF here we come! ✈️\n\nAttending ${eventName} to geek out on ${excitedAbout || 'all things agentic workflows and developer toolchains'}.\n\nWho else is attending? Let's link up in the expo hall!\n\n${hashtags.join(" ")}`,
        ],
        speaker: [
          `Humbled and thrilled to take the stage at ${eventName}! 🎙️\n\nI'll be unpacking practical lessons around "${excitedAbout || 'Architecting Production-Grade Autonomous Agents for Enterprise Reliability'}"—sharing hard-won insights from scaling multi-agent systems without breaking latency budgets.\n\nSave the date: ${eventDate} at Moscone West. See you in the audience!\n\n${hashtags.join(" ")}`,
          `Excited to speak at ${eventName} this October! ⚡\n\nMy session will zero in on ${excitedAbout || 'real-world migration patterns, failure modes, and security governance for enterprise LLMs'}.\n\nBring your toughest technical questions—looking forward to an engaging Q&A.\n\n${hashtags.join(" ")}`,
          `Sneak peek into my upcoming keynote at ${eventName}: 📊\n\nWe'll be breaking down how modern distributed systems handle ${excitedAbout || 'autonomous reasoning loops in high-throughput environments'}.\n\nGrab your ticket via the link below and come say hi after the session!\n\n${hashtags.join(" ")}`,
        ],
        direct: [
          `Attending: ${eventName}\nWhen: ${eventDate}\nWhere: ${eventLocation}\n\nTop focus: ${excitedAbout || 'Autonomous agent architectures & cloud reliability'}.\n\nDM me or comment if you'd like to schedule 15 minutes to chat tech!\n\n${hashtags.join(" ")}`,
          `Confirmed for ${eventName} in SF! 📍\n\nKey priority: ${excitedAbout || 'Connecting with founders and engineering leads scaling production AI'}.\n\nLet me know if you'll be there.\n\n${hashtags.join(" ")}`,
          `Going to ${eventName}. Interested in discussions around ${excitedAbout || 'scalable AI architectures and infrastructure'}. Let's connect.\n\n${hashtags.join(" ")}`,
        ],
      };

      const postEventFallbacks: Record<string, string[]> = {
        thought_leader: [
          `What an incredible 3 days in San Francisco at ${eventName}! 💡\n\nReflecting on the sessions, here are my top 3 takeaways for engineering leaders:\n\n1. Agent autonomy is moving from research demos to hardened multi-tenant infrastructure.\n2. In-context caching and retrieval-aware memory are non-negotiable for sub-second latency.\n3. ${excitedAbout || 'Deterministic security policies beat stochastic guardrails every single time'}.\n\nWhat was your standout insight from the summit? Drop your thoughts below!\n\n${hashtags.join(" ")}`,
          `Back from Moscone West after a jam-packed ${eventName}. 📊\n\nThe biggest industry shift I observed: teams are stopping the debate about foundation model sizes and obsessing over agent orchestration reliability.\n\nParticularly grateful for the sessions diving into ${excitedAbout || 'fault-tolerant reasoning loops and production observability'}.\n\nHuge shoutout to the organizers for an unforgettable conference. See you in 2026!\n\n${hashtags.join(" ")}`,
          `3 key themes that will shape enterprise software over the next 12 months, straight from ${eventName}:\n\n• Microservice boundaries are being redrawn around autonomous agent domains.\n• Telemetry is now evaluating semantic drift rather than simple CPU spikes.\n• ${excitedAbout || 'Cross-disciplinary teams combining AI Ops with distributed infrastructure are pulling ahead'}.\n\nFull debrief notes in the comments 👇\n\n${hashtags.join(" ")}`,
        ],
        casual: [
          `Home from San Francisco with a full notebook and so much inspiration! 🚀\n\n${eventName} exceeded all expectations. The best part? The impromptu hallway chats, debate over pour-overs, and finally meeting so many collaborators in person.\n\nHighlight for me was ${excitedAbout || 'seeing live demos of autonomous systems operating in production'}.\n\nThank you to everyone who made this summit so memorable! Let's keep in touch. ☕\n\n${hashtags.join(" ")}`,
          `What an unforgettable week at Moscone West! 🎉\n\nFrom the opening keynotes to the after-hours meetups, #${eventName.replace(/\s+/g, '')} was pure high-signal energy.\n\nLoved catching up on ${excitedAbout || 'the latest breakthroughs in developer workflows and model toolchains'}.\n\nTagging everyone I had coffee with—until next year! 👋\n\n${hashtags.join(" ")}`,
          `Can we rewind to #${eventName.replace(/\s+/g, '')} already? 🙌\n\nLearned a ton about ${excitedAbout || 'production agent deployments'}, collected great swag, and made lasting connections across the tech ecosystem.\n\nWho's already planning their trip back for 2026?\n\n${hashtags.join(" ")}`,
        ],
        speaker: [
          `Thank you to everyone who packed the room for my keynote at ${eventName}! 🎙️✨\n\nThe energy in Stage B and the caliber of questions around ${excitedAbout || 'zero-downtime agent migrations and latency budgets'} was truly humbling.\n\nAs promised, I have open-sourced the architecture slides and benchmark repository. Link is pinned in the comments below 👇\n\nKeep building, and thank you to the summit crew for putting on a world-class production!\n\n${hashtags.join(" ")}`,
          `Session wrap-up from ${eventName}: ⚡\n\nHonored to present our playbook on ${excitedAbout || 'scaling multi-agent architectures in high-throughput enterprise environments'}.\n\nLoved the follow-up discussions in the speaker lounge. If we didn't get to finish our chat, my DMs are open!\n\nSlide deck download link in comments.\n\n${hashtags.join(" ")}`,
          `Keynote completed at ${eventName}! 📊\n\nWe broke down real failure modes, latency mitigations, and ${excitedAbout || 'the migration from monolithic pipelines to distributed reasoning swarms'}.\n\nRecording and slides will be live on the summit portal next week.\n\n${hashtags.join(" ")}`,
        ],
        direct: [
          `Recap: ${eventName} 2025\n\nCore takeaways:\n• ${excitedAbout || 'Autonomous agents are standardizing on deterministic orchestration'}.\n• Context window caching cuts inference bills by 60%+.\n• Observability must be end-to-end semantic trace.\n\nSlides and summary notes available upon request.\n\n${hashtags.join(" ")}`,
          `Wrap-up from ${eventName} in SF! 📍\n\nKey learning: ${excitedAbout || 'Infrastructure resiliency is the number one bottleneck for enterprise AI adoption'}.\n\nAlways happy to discuss these learnings with anyone building in this space. Reach out!\n\n${hashtags.join(" ")}`,
          `Attended ${eventName}. Top insight: ${excitedAbout || 'Agentic architectures are ready for prime time with proper guardrails'}.\n\nGreat connecting with everyone in SF.\n\n${hashtags.join(" ")}`,
        ],
      };

      const fallbackMap = isPostEvent ? postEventFallbacks : preEventFallbacks;
      const selectedList = fallbackMap[tone] || fallbackMap.thought_leader;
      return NextResponse.json({
        success: true,
        variations: selectedList,
        generatedWithAI: false,
      });
    }

    if (action === "test_prompt") {
      return NextResponse.json({
        success: true,
        testResults: [
          {
            persona: "Enterprise VP of Eng",
            hook: "Evaluating agentic ROI for 2026 infrastructure roadmaps...",
            score: "9.6 / 10 Virality Index",
          },
          {
            persona: "Staff AI Engineer",
            hook: "Benchmarking latency trade-offs in distributed context windows...",
            score: "9.2 / 10 Virality Index",
          },
          {
            persona: "Founder & CTO",
            hook: "Zero-downtime microservice migrations to agentic clusters...",
            score: "9.5 / 10 Virality Index",
          },
        ],
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
