import { Select, SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";
import dynamic from "next/dynamic";
import "./Schedule.css";
import { Text } from "../Text/Text";

const TimeInput = dynamic(
    () => import("@nextui-org/react").then((mod) => mod.TimeInput),
    { ssr: false }
);

export const days = [
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
];

type handleScheduleChange = (
    index: number,
    field: string,
    value: string
) => void;

interface ScheduleType {
    index: number;
    handleScheduleChange: handleScheduleChange;
    handleRemoveSchedule: () => void;
}

function Schedule({ index, handleScheduleChange, handleRemoveSchedule }: ScheduleType) {
    const t = useTranslations("Translations");

    return (
        <div className="schedule-element">
            <Select
                // className="max-w-xs"
                classNames={{
                    trigger: "selectElement",
                    value: "selectValue",
                    base: "selectElementBase",
                    listbox: "selectListBox",
                }}
                items={days}
                variant="faded"
                label={t("Select a day")}
                onChange={(e) =>
                    handleScheduleChange(index, "day", e?.target.value)
                }
            >
                {days.map((day) => (
                    <SelectItem
                        classNames={{
                            base: "selectItemUnique",
                        }}
                        textValue={t(day.day)}
                        key={day.day}
                    >
                        <Text>{day.day}</Text>
                    </SelectItem>
                ))}
            </Select>

            <TimeInput
                classNames={{
                    inputWrapper: "middleTimeInputWrapper",
                    base: "middleTimeBase",
                }}
                label="Start Time"
                onChange={(e) =>
                    handleScheduleChange(
                        index,
                        "startTime",
                        e?.toString() || ""
                    )
                }
            />
            <TimeInput
                classNames={{
                    inputWrapper: "lastTimeInputWrapper",
                    base: "lastTimeBase",
                }}
                variant="faded"
                label="End Time"
                onChange={(e) =>
                    handleScheduleChange(index, "endTime", e?.toString() || "")
                }
            />

            <button className="remove-button" type="button" onClick={handleRemoveSchedule}>
                Remove
            </button>
        </div>
    );
}

export default Schedule;
