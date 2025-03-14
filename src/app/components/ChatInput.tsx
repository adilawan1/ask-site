"use client";
import { Textarea, Button } from "@heroui/react";
import { input } from "@nextui-org/react";
import { Send } from "lucide-react";
import { type useChat } from "ai/react";

type handleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type handleSubmit = ReturnType<typeof useChat>["handleSubmit"];
type SetInput = ReturnType<typeof useChat>["setInput"];

interface ChatInputProps {
  input: string;
  handleInputChange: handleInputChange;
  handleSubmit: handleSubmit;
  setInput: SetInput;
}

export const ChatInput = ({
  handleInputChange,
  handleSubmit,
  setInput,
  input,
}: ChatInputProps) => {
  return (
    <div className="z-10 bg-zinc-900 absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <form className="relative" onSubmit={handleSubmit}>
              <Textarea
                minRows={2}
                autoFocus
                disableAutosize
                onChange={handleInputChange}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                    setInput("");
                  }
                }}
                placeholder="Enter your question..."
                className="resize-none bg-zinc-800 hover:bg-zinc-900 rounded-xl text-base p-4 max-w-lg outline-none"
                classNames={{ input: "outline-none" }}
              />
              <Button
                size="sm"
                type="submit"
                className="absolute border border-border bg-zinc-900 right-2 bottom-2 p-4 rounded-xl"
                isIconOnly
              >
                <Send />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
