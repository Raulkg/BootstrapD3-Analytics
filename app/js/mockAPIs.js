(function () {
    $.mockjaxSettings.logging = 0;  // only critical error messages

    // persisted data
    var frozenTrafficStatus = null;

    // var maxConnections = (function() {
    //     var cache = [0, 1];

    //     return function(nodes) {
    //         if (!cache[nodes]) {
    //             for (var i = cache.length; i <= nodes; i++) {
    //                 cache.push(cache[i - 1] * i);
    //             }
    //         }

    //         return cache[nodes];
    //     };
    // })();

    function getResponderWithFailureRate(url, urlParams, responseFunc, failureRate) {
        return function(requestSettings) {
            var service = requestSettings.url.match(url);

            if (service) {
                var mockDefinition = {
                    type: "GET",
                    url: url,
                    urlParams: urlParams,
                    contentType: "application/json"
                };

                if (Math.random() < failureRate) {
                    mockDefinition = _.assign(mockDefinition, {
                        status: 500,
                        response: "An Internal Server Error!!!"
                    });
                } else {
                    mockDefinition = _.assign(mockDefinition, {
                        status: 200,
                        response: responseFunc
                    });
                }

                return mockDefinition;
            }

            return;
        };
    }

    function getTrafficStatusResponse(startTime, endTime) {
        var records = [],
            constants = {
                types: [
                    "type1",
                    "type2",
                    "type3",
                    "type4"
                ]
            },
            objects = [],
            throughputUpperBound = 20000,
            packetUpperBound = 1000,
            totalObjs = _.random(10, 19), // 10 ~ 19 objects in total
            remainingObjs = new Set(),
            timeTag = "Generating Traffic Status Records";

        for (var i = 0; i < totalObjs; i++) {
            objects.push({
                id: "obj" + (i + 1),
                type: constants.types[_.random(4)]
            });
            remainingObjs.add("obj" + (i + 1));
        }

        var connections = new Set(),
            totalRecords = _.random(100, 199); // 100 ~ 199 records

        console.time(timeTag);
        var i = 0, counter = 0, maxTrial = 600; 
        while (i < totalRecords && counter < maxTrial) {
            var pair = _.sampleSize(objects, 2),
                serialized = JSON.stringify(pair);

            if (!connections.has(serialized)) {
                records.push({
                    srcObj: pair[0].id,
                    srcType: pair[0].type,
                    destObj: pair[1].id,
                    destType: pair[1].type,
                    traffic: _.random(throughputUpperBound),
                    packets: _.random(packetUpperBound)
                });
                connections.add(serialized);
                remainingObjs.delete(pair[0].id);
                remainingObjs.delete(pair[1].id);
                i++;
            }
            counter++;
        }
        if (i < totalRecords) {
            console.warn(["A immature response generated! with", i, "records!!"].join(" "));
            console.warn(["Attempted to generate a size of", totalRecords].join(" "));
        }
        console.timeEnd(timeTag);

        remainingObjs.forEach(function(val) {
            var pair = [_.find(objects, function(object) {
                return object.id === val;
            }), _.sample(_.filter(objects, function(object) {
                return object.id !== val;
            }))],
            serialized = JSON.stringify(pair);
            
            records.push({
                srcObj: pair[0].id,
                srcType: pair[0].type,
                destObj: pair[1].id,
                destType: pair[1].type,
                traffic: _.random(throughputUpperBound),
                packets: _.random(packetUpperBound)
            });
            connections.add(serialized);
        });
        remainingObjs.clear();

        return {
            header: {
                time_range: {
                    start: new Date(startTime).toISOString(),
                    end: new Date(endTime).toISOString()
                },
                recordsCount: totalRecords
            },
            data: records
        };
    }

    function logger(title, settings, response) {
        console.info("\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/");
        console.info("| Request URL", settings.url);
        console.info("| ", title, response);
        console.info("/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\");
    }

    var handler = getResponderWithFailureRate(
            /^\/traffic_status\/?(?:(.*))$/,
            ["dataStatus"],
            function(settings) {
                if (!settings.urlParams.dataStatus
                    || settings.urlParams.dataStatus !== "frozen") {
                    var st = new Date(),
                        et = new Date(st.getTime() + 10 * 1000);

                    this.responseText = getTrafficStatusResponse(st, et);
                } else {
                    if (!frozenTrafficStatus) {
                        var st = new Date(),
                            et = new Date(st.getTime() + 10 * 1000);

                        frozenTrafficStatus = getTrafficStatusResponse(st, et);
                    }

                    this.responseText = frozenTrafficStatus;
                }

                logger("Traffic Status Response", settings, this.responseText);
            },
            0.2
        );

    $.mockjax(handler);
})();
