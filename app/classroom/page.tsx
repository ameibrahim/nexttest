"use client";

import React, { useState } from "react";
import Image from "next/image";

import "./classroom.css"; // Ensure the CSS path is correct or import directly if using CSS modules

export default function Classroom() {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [panelWidth, setPanelWidth] = useState("400px");
    const [mainContentStyle, setMainContentStyle] = useState({
        left: "400px",
        width: "calc(100% - 400px)",
    });

    const [courseSelectStyle, setCourseSelectStyle] = useState({ left: "0%" });
    const [lectureSelectStyle, setLectureSelectStyle] = useState({
        left: "100%",
    });

    const moveBack = () => {
        setCourseSelectStyle({ left: "0%" });
        setLectureSelectStyle({ left: "100%" });
    };

    const togglePanel = () => {
        if (isPanelOpen) {
            setPanelWidth("0px");
            setMainContentStyle({ left: "0px", width: "100%" });
        } else {
            setPanelWidth("400px");
            setMainContentStyle({ left: "400px", width: "calc(100% - 400px)" });
        }
        setIsPanelOpen(!isPanelOpen);
    };

    const moveForward = () => {
        setCourseSelectStyle({ left: "-100%" });
        setLectureSelectStyle({ left: "0%" });
    };

    return (
        <div className="classroom-container">
            <div className="classroom-header">
                <div className="classroom-left-action-container">
                    <div className="panel-action" onClick={togglePanel}>
                        <Image
                            width={20}
                            height={20}
                            src="/assets/menu.png"
                            alt=""
                        />
                    </div>
                    <div className="fullscreen">
                        <Image
                            width={20}
                            height={20}
                            src="/assets/fullscreen.png"
                            alt=""
                        />
                    </div>
                </div>
                <div className="classroom-right-action-container">
                    <div className="button start-button">start</div>
                    <div className="button stop-button">stop</div>
                </div>
            </div>

            <div className="classroom-body">
                <div className="classroom-timeline-panel" style={{width: panelWidth}}>
                    <div className="classroom-course-select-panel" style={courseSelectStyle}>
                        <button onClick={moveForward}>Hello</button>
                    </div>
                    <div className="classroom-lecture-select-panel" style={lectureSelectStyle}>
                        <button onClick={moveBack}>Back</button>
                        Bye
                    </div>
                </div>
                <div className="classroom-main-content-wrapper" style={mainContentStyle}>
                    <div className="classroom-main-content">
                        <div className="attempt-pdf-render"></div>
                    </div>
                    <div className="classroom-dux-wrapper">
                        <div className="dux-element">
                            <Image
                                width={300}
                                height={300}
                                src="/assets/dux.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
