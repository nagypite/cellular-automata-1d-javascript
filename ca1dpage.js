﻿
let APP = {ca1d: null,
           casvg1d: null}


window.onload = function()
{
    APP.ca1d = new CellularAutomaton1D();
    APP.casvg1d = new CellularAutomaton1DSVG("CASVG", APP.ca1d);

    SetEventHandlers();
    InitializeValue();
}


function SetEventHandlers()
{
    document.getElementById("btnInitializeToCentre").onclick = InitializeToCentre;
    document.getElementById("btnInitializeValue").onclick = InitializeValue;
    document.getElementById("btnRandomize").onclick = Randomize;
    document.getElementById("btnRun").onclick = Run;
    document.getElementById("btnClear").onclick = Clear;
}


function InitializeValue()
{
    SetCellFormats();

    APP.ca1d.NumberOfCells = parseInt(document.getElementById("udNumberOfCells").value);

    APP.casvg1d.Clear();
    APP.ca1d.InitializeValue(document.getElementById("udInit").value);
}


function InitializeToCentre()
{
    SetCellFormats();

    APP.ca1d.NumberOfCells = parseInt(document.getElementById("udNumberOfCells").value);

    APP.casvg1d.Clear();
    APP.ca1d.InitializeToCentre();
}


function Randomize()
{
    SetCellFormats();

    APP.ca1d.NumberOfCells = parseInt(document.getElementById("udNumberOfCells").value);

    APP.casvg1d.Clear();
    APP.ca1d.Randomize();
}


function Run()
{
    if (APP.ca1d.CurrentState[0] === undefined)
    {
        alert('Cellular Automaton is not initialized.\nPlease click "Initialize to Centre" or "Randomize"');
    }
    else
    {
        SetCellFormats();

        APP.ca1d.Rule = parseInt(document.getElementById("udRule").value);

        if (document.getElementById("udBoundary").value.length) {
            let boundary = document.getElementById("udBoundary").value.split('');
            if (boundary.length < 2) {
                boundary[1] = boundary[0];
            }

            APP.ca1d.BoundaryCircular = false;
            APP.ca1d.BoundaryCells = boundary;
        }
        else {
            APP.ca1d.BoundaryCircular = true;
        }
        let Iterations = parseInt(document.getElementById("udIterations").value);

        APP.ca1d.Iterate(Iterations);
    }
}


function Clear()
{
    APP.casvg1d.Clear();
}


function SetCellFormats()
{
    let NewCellSize = document.getElementById("udCellSize").value;
    if(NewCellSize !== APP.casvg1d.CellSize)
    {
        APP.casvg1d.CellSize = NewCellSize;
        APP.casvg1d.Clear();
    }

    let NewCellZeroColor = document.getElementById("colCellZeroColor").value;
    if (NewCellZeroColor !== APP.casvg1d.CellZeroColor)
    {
        APP.casvg1d.CellZeroColor = NewCellZeroColor;
        APP.casvg1d.Clear();
    }

    let NewCellOneColor = document.getElementById("colCellOneColor").value;
    if (NewCellOneColor !== APP.casvg1d.CellOneColor)
    {
        APP.casvg1d.CellOneColor = NewCellOneColor;
        APP.casvg1d.Clear();
    }
}
