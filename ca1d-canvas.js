
class CellularAutomaton1DCanvas
{
  constructor(canvasID, CA)
  {
    this._canvasID = canvasID;
    this._canvas = document.getElementById(canvasID);
    this._ctx = this._canvas.getContext("2d");
    this._CA = CA;
    this._Iteration = 0;

    this._CellSize = 16;
    this._CellZeroColor = "#FFFFFF";
    this._CellOneColor = "#000000";

    let that = this;

    this._CA.StateChangedEventHandlers.push(function(edit)
      {
        if (edit) {
          that._Iteration--;
        }
        else {
          that._SetHeight(that._CellSize * that._Iteration, true);
        }
        that._DrawState();
      });

    this._CA.NumberOfCellsChangedEventHandlers.push(function()
      {
        that._SetWidth(that._CellSize * that._CA.NumberOfCells);
      });

    this._SetWidth(this._CellSize * this._CA.NumberOfCells);
    this._SetHeight(this._CellSize * this._Iteration);
  }

  //---------------------------------------------------
  // PROPERTIES
  //---------------------------------------------------

  get CellSize() { return this._CellSize; }
  set CellSize(CellSize) { this._CellSize = CellSize; }

  get CellZeroColor() { return this._CellZeroColor; }
  set CellZeroColor(CellZeroColor) { this._CellZeroColor = CellZeroColor; }

  get CellOneColor() { return this._CellOneColor; }
  set CellOneColor(CellOneColor) { this._CellOneColor = CellOneColor; }

  //---------------------------------------------------
  // METHODS
  //---------------------------------------------------

  _DrawState()
  {
    let that = this;
    this._SetHeight(this._CellSize * (this._Iteration + 1), true);

    for (let i = 0, m = this._CA.NumberOfCells; i < m; i++)
    {
      /*
            rect.addEventListener('click', function() {
                that._CA.ToggleCell(i);
            })
            */

      if (this._CA.CurrentState[i] == 0)
      {
        that._ctx.fillStyle   = this._CellZeroColor;
        that._ctx.strokeStyle = this._CellOneColor;
      }
      else
      {
        that._ctx.fillStyle   = this._CellOneColor;
        that._ctx.strokeStyle = this._CellZeroColor;
      }

      that._ctx.fillRect(i * this._CellSize, this._Iteration * this._CellSize, this._CellSize-1, this._CellSize-1);
    }

    this._Iteration++;
  }

  _SetHeight(height, keepData)
  {
    let canvasData;
    console.log('setting height to', height);
    if (keepData) {
      canvasData = this._ctx.getImageData(0, 0, this._canvas.width-1, this._canvas.height-1);

      console.log('saved canvas data', canvasData);
    }

    this._canvas.setAttribute("height", height);

    if (keepData) {
      this._ctx.putImageData(canvasData, 0, 0);
    }
  }

  _SetWidth(width)
  {
    console.log('setting width to', width);
    this._canvas.setAttribute("width", width);
  }

  Clear()
  {
    // this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);;

    this._Iteration = 0;

    this._SetHeight(0);
  }
}

