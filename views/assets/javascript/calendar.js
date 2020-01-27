$(document).ready(function () {


    /* initialize the external events
    -----------------------------------------------------------------*/

    $('#external-events .fc-event').each(function () {

        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $.trim($(this).text()), // use the element's text as the event title
            stick: true, // maintain when user navigates (see docs on the renderEvent method)
            id: $(this).attr('id'),
            color: $(this).data('color')
        });

        console.log('min', $(this))

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });


    /* initialize the calendar
    -----------------------------------------------------------------*/

    $('#calendar').fullCalendar({
        header: {
            left: 'today',
            center: 'title',
            right: 'agendaWeek'
        },
        allDaySlot: false,
        slotEventOverlap: false,
        eventOverlap: function (stillEvent, movingEvent) {
            return stillEvent.allDay && movingEvent.allDay;
        },
        columnFormat: {
            week: 'dddd'
        },
        titleFormat: 'dddd',
        eventDrop: function (event, delta, revertFunc) {
            //inner column movement drop so get start and call the ajax function......
            console.log(event.start.format());
            console.log(event.id);

            //alert(event.title + " was dropped on " + event.start.format());

        },
        eventResize: function (event, delta, revertFunc) {
            console.log(event.id);
            console.log("Start time: " + event.start.format() + "end time: " + event.end.format());

        },
        timeFormat: 'H(:mm)',

        editable: true,
        defaultView: 'agendaWeek',
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function (date) {

            //Call when you drop any red/green/blue class to the week table.....first time runs only.....
            console.log("dropped");
            console.log(arguments);
            console.log(date.format());
            console.log(this.id);


            // is the "remove after drop" checkbox checked?
            /*if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }*/
        },
        eventRender: function (event, element) {

        }

    });


});
