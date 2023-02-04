
let APP = {ca1d: null,
           caDisplay: null}


window.onload = function()
{
    APP.ca1d = new CellularAutomaton1D();
    //APP.caDisplay = new CellularAutomaton1DSVG("CASVG", APP.ca1d);
    APP.caDisplay = new CellularAutomaton1DCanvas("ca-canvas", APP.ca1d);

    SetEventHandlers();
    InitializeToCentre();
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

    APP.caDisplay.Clear();
    APP.ca1d.InitializeValue(document.getElementById("udInit").value);
}


function InitializeToCentre()
{
    SetCellFormats();

    APP.ca1d.NumberOfCells = parseInt(document.getElementById("udNumberOfCells").value);

    APP.caDisplay.Clear();
    APP.ca1d.InitializeToCentre();
}


function Randomize()
{
    SetCellFormats();

    APP.ca1d.NumberOfCells = parseInt(document.getElementById("udNumberOfCells").value);

    APP.caDisplay.Clear();
    APP.ca1d.Randomize();
}


function Run()
{
    if (APP.ca1d.CurrentState[0] === undefined)
    {
        alert('Cellular Automaton is not initialized.\nPlease choose a method by clicling on one of the Initialization buttons.');
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
    APP.caDisplay.Clear();
}


function SetCellFormats()
{
    let NewCellSize = document.getElementById("udCellSize").value;
    if(NewCellSize !== APP.caDisplay.CellSize)
    {
        APP.caDisplay.CellSize = NewCellSize;
        APP.caDisplay.Clear();
    }

    let NewCellZeroColor = document.getElementById("colCellZeroColor").value;
    if (NewCellZeroColor !== APP.caDisplay.CellZeroColor)
    {
        APP.caDisplay.CellZeroColor = NewCellZeroColor;
        APP.caDisplay.Clear();
    }

    let NewCellOneColor = document.getElementById("colCellOneColor").value;
    if (NewCellOneColor !== APP.caDisplay.CellOneColor)
    {
        APP.caDisplay.CellOneColor = NewCellOneColor;
        APP.caDisplay.Clear();
    }
}
