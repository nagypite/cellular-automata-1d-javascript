
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
    this._CellGridLimit = 10;
    this._CellZeroColor = "#FFFFFF";
    this._CellOneColor = "#000000";

    this._ResizePerRow = true;

    this._Debug = false;

    let that = this;

    this._canvas.addEventListener('mousedown', function(e) {
      let rect = that._canvas.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      let cellCol = Math.floor(x/that._CellSize);
      let cellRow = Math.floor(y/that._CellSize);

      if (that._Debug) console.log('clicked coords', x, y, cellCol, cellRow, cellRow + 1 == that._Iteration);

      // The user clicked on the last row, we should change colors
      if (cellRow == that._Iteration - 1) {
        that._CA.ToggleCell(cellCol);
      }
    })

    this._CA.StateChangedEventHandlers.push(function(edit)
      {
        if (that._Debug) console.log('changed state', that, edit);

        if (edit) {
          that._Iteration--;
        }
        else {
          //that._SetHeight(that._CellSize * that._Iteration, true);
        }
        that._DrawState();
      });

    this._CA.NumberOfCellsChangedEventHandlers.push(function()
      {
        if (that._Debug) console.log('number of cells changed', that);
        that._SetWidth(that._CellSize * that._CA.NumberOfCells);
      });

    this._CA.IterationStartEventHandlers.push(function(iterations)
      {
        if (that._Debug) console.log('starting iterations', that, iterations);
        that._ResizePerRow = false;
        that._SetHeight(that._CellSize * (that._Iteration + iterations), true);
      });

    this._CA.IterationEndEventHandlers.push(function()
      {
        if (that._Debug) console.log('ending iterations', that);
        that._ResizePerRow = true;
      });

    //this._SetWidth(this._CellSize * this._CA.NumberOfCells);
    //this._SetHeight(this._CellSize * this._Iteration);
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
    let rectSize = this._CellSize >= this._CellGridLimit ? this._CellSize - 1 : this._CellSize;

    if (this._ResizePerRow) {
      this._SetHeight(this._CellSize * (this._Iteration + 1), true);
    }

    for (let i = 0, m = this._CA.NumberOfCells; i < m; i++)
    {
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

      that._ctx.fillRect(i * this._CellSize, this._Iteration * this._CellSize, rectSize, rectSize);
    }

    this._Iteration++;
  }

  _SetHeight(height, keepData)
  {
    let canvasData;
    if (this._Debug) console.log('setting height to', height, 'from', this._canvas.height);
    if (height > 0 && keepData && this._canvas.height) {
      canvasData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);

      if (this._Debug) console.log('saved canvas data', canvasData);
    }

    this._canvas.setAttribute("height", height);

    if (height > 0 && keepData && canvasData) {
      this._ctx.putImageData(canvasData, 0, 0);
    }
  }

  _SetWidth(width)
  {
    if (this._Debug) console.log('setting width to', width);
    this._canvas.setAttribute("width", width);
  }

  Clear()
  {
    this._Iteration = 0;

    this._SetHeight(0);
  }
}

