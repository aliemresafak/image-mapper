import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Circle, Layer, Stage} from "react-konva"
import Konva from "konva";
import Table from "./components/Table"
import {Area, BaseMappingData, Coord} from "./interface";
import PartImage from "./assets/part.png"
import MappingDialog from "./components/MappingDialog";
import {mappingData} from "./data"

function App() {
    const [areas, setAreas] = useState<Area[]>([])
    const [mappingDialogVisible, setMappingDialogVisible] = useState<boolean>(false)
    const [selectedCoords, setSelectedCoords] = useState<Coord>({} as Coord)
    const imageMappingRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const contextMenuRef = useRef<HTMLDivElement>(null)
    const clickAction = (event: Konva.KonvaEventObject<MouseEvent>) => {
        setMappingDialogVisible(true)
        setSelectedCoords({x: event.evt.clientX, y: event.evt.clientY})
    }
    const dragEndAction = (event: Konva.KonvaEventObject<DragEvent>, id: string) => {
        const currentMapping = areas.find(area => area.id === id)
        const newState = areas.filter(area => area.id !== id)
        if (currentMapping) {
            currentMapping.coords = {
                x: event.evt.clientX,
                y: event.evt.clientY
            }
            setAreas([...newState, currentMapping])
        }
    }

    const deleteAction = (evt: Konva.KonvaEventObject<Event>, id: string) => {
        setAreas([...areas.filter(area => area.id !== id)])
    }
    const contextMenuAction = (event: Konva.KonvaEventObject<PointerEvent>, area: Area) => {
        event.evt.preventDefault()
        if(contextMenuRef.current){
            contextMenuRef.current.style.display = 'block'
            contextMenuRef.current.style.left = `${event.evt.clientX + 5}px`
            contextMenuRef.current.style.top = `${event.evt.clientY + 5}px`
            const deleteMenu = contextMenuRef.current.querySelector("button#delete-button")
            deleteMenu && deleteMenu.addEventListener("click", () => {
                setAreas(prevState => [...prevState.filter(_area => _area.id !== area.id)])
            })
        }
    }
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.onclick = () => {
                if (contextMenuRef.current) {
                    contextMenuRef.current.style.display = 'none'
                }
            }
        }
    }, [])

    return (
        <div ref={containerRef} className="container">
            <div ref={contextMenuRef} className="menu">
                <button id="delete-button" onClick={() => alert("delete")}>Delete</button>
                <button id="delete-button" onClick={() => alert("delete")}>Reassing</button>
                <button id="delete-button" onClick={() => alert("delete")}>Buy</button>
            </div>
            <div ref={imageMappingRef} className="image-mapping">
                <img width="100%" height="100%" src={PartImage} alt=""/>
                <Stage
                    width={800}
                    height={1000}
                    onDblClick={clickAction}
                >
                    <Layer>
                        {areas.map((area) => (
                            <Circle
                                key={area.id}
                                draggable
                                x={area.coords.x}
                                y={area.coords.y}
                                radius={10}
                                fill="red"
                                onDragEnd={(event) => dragEndAction(event, area.id)}
                                onDblClick={(event) => deleteAction(event, area.id)}
                                onContextMenu={(event) => contextMenuAction(event, area)}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
            <div className="mapping-table">
                <Table data={areas}/>
            </div>
            <MappingDialog
                visible={mappingDialogVisible}
                title="Mapping Part"
                onClose={() => setMappingDialogVisible(false)}
                data={mappingData.filter(m => !areas.some(area => area.id === m.id))}
                setMapping={(mappingData: BaseMappingData) => {
                    const data: Area = {
                        id: mappingData.id,
                        name: mappingData.name,
                        coords: selectedCoords
                    }
                    setAreas(prevState => [...prevState, data])
                }}
            />
        </div>
    );
}

export default App;
